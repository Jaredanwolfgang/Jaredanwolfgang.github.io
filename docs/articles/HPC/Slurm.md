# Slurm 配置指北

在23年IndySCC的时候，我就有想过手动在集群上面配置Slurm. 但是苦于那个时候的技术力不够，安装过程中出了各种问题，也不知道怎么解决，今年再战IndySCC24，绝对不能出现去年HPL Zeros的惨案了. 使用Slurm来对集群做调度我觉得是比较好的选择了.

在配置之前，我们大概了解一下Slurm的基本框架：

![Slurm](./asset/arch.gif)

Slurm的基本架构是由三个主要组件组成的：
1. `slurmctld`：Slurm控制守护进程，负责集群管理和任务调度
2. `slurmd`：Slurm工作守护进程，负责接收控制守护进程的指令，启动和管理任务
3. `slurmdbd`：Slurm数据库守护进程，负责管理Slurm的数据库

Slurm的配置文件主要有两个：
1. `slurm.conf`：Slurm的主配置文件，包含了Slurm的全局配置信息
2. `slurmdbd.conf`：Slurm数据库守护进程的配置文件

通常来说，我们只需要配置`slurm.conf`就可以了，`slurmdbd.conf`一般不需要做太多的配置. 同时，在配置集群之前，我们应该提前设计好集群的网络拓扑，确定集群的规模，确定集群的节点类型等等. 我们拿一个简单的集群来举例，假设我们有一个由两个节点组成的集群，一个节点是控制节点，一个节点是计算节点. 那么我们在控制节点上需要配置`slurmcld`和`slurmdbd`，在计算节点上需要配置`slurmd`.

::: details 什么是 Daemon（守护进程）？

[Reference: Daemon](https://en.wikipedia.org/wiki/Daemon_(computing))

在多任务操作系统中，守护进程（daemon）是一种在后台运行的程序，不受用户直接控制. 通常，守护进程的名称以字母“d”结尾，以便区别它与普通程序，例如 syslogd 负责系统日志记录，sshd 用于接收 SSH 连接. 在 Unix 系统中，守护进程的父进程通常（但不总是）是 init 进程. 守护进程可以通过父进程分叉子进程并退出，从而让 init 接管子进程；也可以直接由 init 启动. 

在Unix系统中，可以通过`systemctl`来启用各种服务、查看各种服务的状态，同时可以从`/var/log`或者通过`journalctl`来查看各种服务的日志，从而来找到问题的原因.
:::

我们在正式开始安装Slurm之前，可以简单思考一下，如果我们希望在一个内部集群运行一个集群管理软件，我们需要考虑哪些问题？

- 我们需要保证集群的网络，以及集群的节点之间的通信是正常的（也就是说，节点之间需要能够以某种方式彼此认证）
- 我们需要保证集群的节点之间的时间是同步的，这样才能保证集群的任务调度、对文件的操作等等是正常的
- 我们就需要考虑集群的节点之间的文件共享问题，在运行MPI程序的时候，我们需要访问到相同的路径
- 我们需要考虑集群的异质性，如何能够利用集群不同的CPU、GPU、内存等资源
- 我们希望能够监控集群的运行状态，以及集群的任务调度情况 
- 还有很多其他需要考虑的地方...

针对这些问题，在配置Slurm的过程中，我们使用的不同的工具能帮助我们处理很多上述的问题，在安装Slurm之前我们需要安装一些必要的工具：

- `munge`：用于加密Slurm的通信，通常来说计算结点需要获取到控制节点的授权才能运行任务
- `mariaDB`：用于Slurm的数据库，数据库通常由`slurmdbd`来管理
- `slurm`：Slurm的主要软件包，其中包含了`slurmctld`和`slurmd`等组件

在去年配置Slurm的过程中，由于完全是在网上找一些并不完整的教程，导致了很多问题，今年找到了一个[Slurm Installer](https://github.com/NISP-GmbH/SLURM), 这个工具可以帮助我们自动化安装Slurm，非常方便. (支持 Ubuntu: 18.04, 20.04, 22.04, 24.04/ Centos: 7, 8 and 9/ Rocky Linux: 7, 8 and 9/ Alma Linux: 7, 8 and 9/ Amazon Linux: 2023) 我们之后的示例会在Rocky Linux 9上进行，如果想对Ubuntu的配置过程有更清晰的了解，可以参考[这里](https://github.com/SergioMEV/slurm-for-dummies).这是另外一所大学的配置Slurm的教程，非常详细.

从脚本里面我们可以看到在安装Slurm的过程中进行了什么流程：

```bash 
main_redhat()
{
    disableSElinux # SELinux在系统挂载NFS的时候会有问题，在Slurm节点之间的通信中也会有问题，所以需要关闭
    checkRedHatBasedVersion  
    createRequiredUsers # 主要是创建munge和slurm用户
    setupRequiredRedHatBasedRepositories # 安装mariadb和epel(Extra Packages for Enterprise Linux)的源
    installMariaDBforRedHatBased # 安装MariaDB
    installMungeForRedHatBased # 安装Munge
    setupRngToolsForRedHatBased # 安装rng-tools（用于生成随机数）
    setupMungeForRedHatBased # 配置Munge
    buildSlurmForRedHatBased # 编译Slurm
    setupSlurmForRedHatBased # 配置Slurm
    createRequiredFiles # 创建Slurm的一些必要文件
    fixingPermissions # 修复权限
    enableSystemdServices # 启用Slurm的服务
    executeFirstSlurmCommands # 执行Slurm的一些命令，进行测试
    exit 0
}
```

整个流程下来，这个脚本涵盖了我们上述提到的要安装的内容，但是在真正部署到我们的集群的时候，我们需要根据我们的集群的实际情况来进行配置，比如我们的集群的网络拓扑，我们的集群的节点类型等等. 这个脚本会在安装的节点上启用`slurmctld`,`slurmdbd`和`slurmd`服务， 而在我们有些计算节点中，我们可能只需要启用`slurmd`服务即可. 

## 配置Slurm控制节点和数据库节点

通常来说，对于一个小集群，我们可以将Slurm的控制节点和数据库节点放在一起，这样可以减少一些配置的复杂度. 在配置Slurm的控制节点和数据库节点之前，我们需要先安装`munge`和`mariaDB`，然后再安装`slurm`，这样才能保证Slurm的正常运行.

### `disableSElinux`

在配置Slurm的时候，我们需要关闭SELinux，因为SELinux在系统挂载NFS的时候会有问题，在Slurm节点之间的通信中也会有问题，所以需要关闭. 我们可以通过修改`/etc/selinux/config`文件来关闭SELinux：

```bash
SELINUX=disabled
SELINUXTYPE=targeted
```

同时需要输入指令`sudo setenforce 0`来关闭SELinux.

### `createRequiredUsers`

在配置Slurm的时候，我们需要创建两个用户，一个是`munge`，一个是`slurm`，这两个用户的UID需要小于1000（表明是系统用户），这样可以和普通用户区分开来，同时也可以保证Slurm的服务可以正常运行.

```bash
export MUNGEUSER=966 
export SLURMUSER=967
# 系统用户有一些特殊的权限，比如可以访问到一些系统的文件，这样可以保证MUNGE和SLURM的服务可以正常运行
# 系统用户也没有办法使用ssh登陆，这样可以增强系统的安全性
sudo groupadd -g $MUNGEUSER munge
sudo useradd  -m -c "MUNGE Uid 'N' Gid Emporium" -d /var/lib/munge -u $MUNGEUSER -g munge  -s /sbin/nologin munge
sudo groupadd -g $SLURMUSER slurm
sudo useradd  -m -c "SLURM workload manager" -d /var/lib/slurm -u $SLURMUSER -g slurm  -s /bin/bash slurm
# -m 创建用户的家目录
# -c 添加用户的备注信息
# -d 指定用户的家目录
# -u 指定用户的UID
# -g 指定用户的GID
# -s 指定用户的shell权限（nologin表示不允许登陆）
```

### `setupRequiredRedHatBasedRepositories`

```bash
sudo yum install epel-release -y # 安装epel的源
sudo curl -LsS https://r.mariadb.com/downloads/mariadb_repo_setup | sudo bash  # 安装MariaDB的源
sudo yum install https://dl.fedoraproject.org/pub/epel/epel-release-latest-9.noarch.rpm -y # 安装epel的源
```

Epel(Extra Packages for Enterprise Linux)是一个由Fedora项目维护的一个软件仓库，它包含了一些Fedora中的软件包，这些软件包在RHEL、CentOS等系统中没有，但是又是很有用的. MariaDB是一个由MySQL的创始人创建的一个开源的关系型数据库管理系统，它是MySQL的一个分支，但是在一些方面有所改进.

### `installMariaDBforRedHatBased`

```bash
sudo yum install MariaDB-server MariaDB-devel dnf -y
sudo systemctl enable --now mariadb # 启用MariaDB（当需要Accounting服务的时候需要启用MariaDB）
```

### `installMungeForRedHatBased`,  `setupRngToolsForRedHatBased`, `setupMungeForRedHatBased`

```bash
sudo yum install munge munge-libs  -y
sudo dnf --enablerepo=crb install munge-devel -y # 安装munge的开发包

sudo yum install rng-tools -y # 安装rng-tools
sudo rngd -r /dev/urandom # 启动rng-tools(用于生成随机数)

sudo /usr/sbin/create-munge-key -r -f
sudo sh -c  "dd if=/dev/urandom bs=1 count=1024 > /etc/munge/munge.key"

# 非常重要，需要更改munge.key的权限
sudo chown munge: /etc/munge/munge.key
sudo chmod 400 /etc/munge/munge.key
sudo cp /etc/munge/munge.key ~/munge.key # 复制到共享home目录，这样可以在其他节点上使用

sudo systemctl enable --now munge
```

### `buildSlurmForRedHatBased`, `setupSlurmForRedHatBased`

```bash
sudo yum install python3 gcc openssl openssl-devel pam-devel numactl numactl-devel hwloc lua readline-devel ncurses-devel man2html libibmad libibumad rpm-build  perl-ExtUtils-MakeMaker.noarch -y
sudo yum install rpm-build make -y
sudo dnf --enablerepo=crb install rrdtool-devel lua-devel hwloc-devel -y

export VER=22.05.9
wget --no-check-certificate https://download.schedmd.com/slurm/slurm-$VER.tar.bz2
tar -xvf slurm-$VER.tar.bz2
rpmbuild -ta slurm-$VER.tar.bz2 --define '_lto_cflags %{nil}' --with mysql # 编译Slurm
cd ~/rpmbuild/RPMS/x86_64/
sudo yum --nogpgcheck localinstall slurm-[0-9]*.el*.x86_64.rpm slurm-contribs-*.el*.x86_64.rpm slurm-devel-*.el*.x86_64.rpm slurm-example-configs-*.el*.x86_64.rpm slurm-libpmi-*.el*.x86_64.rpm slurm-pam_slurm-*.el*.x86_64.rpm slurm-perlapi-*.el*.x86_64.rpm slurm-slurmctld-*.el*.x86_64.rpm slurm-slurmd-*.el*.x86_64.rpm slurm-slurmdbd-*.el*.x86_64.rpm -y
```

在安装好了Slurm之后，我们需要对一些文件进行一些配置：

1. `slurm.conf`：Slurm的主配置文件，包含了Slurm的全局配置信息（这个配置文件需要在控制节点和计算节点上都配置，保证一样）需要注意的事情是，在这之前我们需要提前配置好`/etc/hosts`，确保每个节点可以通过hostname来访问到其他节点. 一个简单的`slurm.conf`文件如下：

    ```bash
    # slurm.conf file generated by configurator easy.html.
    # Put this file on all nodes of your cluster.
    # See the slurm.conf man page for more information.
    #
    SlurmctldHost=login
    #
    #MailProg=/bin/mail
    MpiDefault=none
    #MpiParams=ports=#-#
    ProctrackType=proctrack/cgroup
    ReturnToService=2
    SlurmctldPidFile=/var/run/slurmctld.pid
    #SlurmctldPort=6817
    SlurmdPidFile=/var/run/slurmd.pid
    #SlurmdPort=6818
    SlurmdSpoolDir=/var/spool/slurm/slurmd
    SlurmUser=slurm
    #SlurmdUser=root
    StateSaveLocation=/var/spool/slurm/
    SwitchType=switch/none
    TaskPlugin=task/affinity
    #
    #
    # TIMERS
    #KillWait=30
    #MinJobAge=300
    #SlurmctldTimeout=120
    #SlurmdTimeout=300
    #
    #
    # SCHEDULING
    SchedulerType=sched/backfill
    SelectType=select/cons_tres
    SelectTypeParameters=CR_Core
    #
    #
    # LOGGING AND ACCOUNTING
    AccountingStorageType=accounting_storage/slurmdbd
    ClusterName=cluster
    #JobAcctGatherFrequency=30
    JobAcctGatherType=jobacct_gather/none
    #SlurmctldDebug=info
    SlurmctldLogFile=/var/log/slurmctld.log
    #SlurmdDebug=info
    SlurmdLogFile=/var/log/slurmd.log
    #
    #
    # COMPUTE NODES
    NodeName=login NodeAddr=10.3.68.xx CPUs=2 Boards=1 SocketsPerBoard=2 CoresPerSocket=1 ThreadsPerCore=1 State=UNKNOWN
    NodeName=cpu0 NodeAddr=10.3.68.xx CPUs=32 Boards=1 SocketsPerBoard=32 CoresPerSocket=1 ThreadsPerCore=1 State=UNKNOWN
    NodeName=cpu1 NodeAddr=10.3.68.xx CPUs=32 Boards=1 SocketsPerBoard=32 CoresPerSocket=1 ThreadsPerCore=1 State=UNKNOWN
    NodeName=cpu2 NodeAddr=10.3.68.xx CPUs=32 Boards=1 SocketsPerBoard=32 CoresPerSocket=1 ThreadsPerCore=1 State=UNKNOWN
    NodeName=cpu3 NodeAddr=10.3.68.xx CPUs=32 Boards=1 SocketsPerBoard=32 CoresPerSocket=1 ThreadsPerCore=1 State=UNKNOWN

    PartitionName=login Nodes=login Default=NO MaxTime=INFINITE State=UP
    PartitionName=compute Nodes=cpu[0-3] Default=YES MaxTime=INFINITE State=UP

    # DefMemPerNode=1000
    # MaxMemPerNode=1000
    # DefMemPerCPU=4000 
    # MaxMemPerCPU=4096
    ```
2. `slurmdbd.conf`：Slurm数据库守护进程的配置文件
    ```bash
    if [ "$slurm_accounting_support" == "1" ]; then
        # Define storage and database settings
        StorageType="accounting_storage/mysql"
        DbdHost="localhost"
        StorageHost="$DbdHost"
        StorageLoc="slurm_acct_db"
        StorageUser="slurm"
        SlurmUser="$StorageUser"
        random_mysql_password=$(tr -dc '0-9a-zA-Z@' < /dev/urandom | head -c 20)
        StoragePass="$random_mysql_password"
        StoragePort=3306

        # Create MySQL database with specified credentials
        createMysqlDatabase "$StorageLoc" "$StorageUser" "$StoragePass"

        # Update slurm.conf to use accounting storage
        sudo sed -i 's/AccountingStorageType=accounting_storage\/none/AccountingStorageType=accounting_storage\/slurmdbd/' /etc/slurm/slurm.conf

        # Generate slurmdbd.conf with database configuration
        cat <<EOF | sudo tee /etc/slurm/slurmdbd.conf
    StorageType=$StorageType
    DbdHost=$DbdHost
    StorageHost=$StorageHost
    StorageLoc=$StorageLoc
    StorageUser=$StorageUser
    SlurmUser=$SlurmUser
    StoragePass=$StoragePass
    StoragePort=$StoragePort
    LogFile=/var/log/slurmdbd.log
    EOF

    fi
    ```
3. `cgroup.conf`：Slurm的cgroup配置文件
    ```bash
    #
    # Slurm cgroup support configuration file
    # See man slurm.conf and man cgroup.conf for further
    # information on cgroup configuration parameters
    #
    CgroupPlugin=cgroup/v1
    CgroupAutomount=yes
    ConstrainCores=no
    ConstrainRAMSpace=no
    ```
4. `/etc/my.cnf.d/slurm.cnf`
    ```bash
    if [ ! -f /etc/my.cnf.d/slurm.cnf ]; then
        # Calculate total memory and set innodb_buffer_pool_size to 50% of total memory
        total_memory=$(free -m | awk '/^Mem:/{print $2}')
        innodb_buffer_percent=50
        innodb_buffer_pool_size=$((total_memory * innodb_buffer_percent / 100))

        # Write configuration to /etc/my.cnf.d/slurm.cnf
        cat <<EOF | sudo tee /etc/my.cnf.d/slurm.cnf
    [mariadb]
    innodb_lock_wait_timeout=900
    innodb_log_file_size=128M
    max_allowed_packet=32M
    innodb_buffer_pool_size=${innodb_buffer_pool_size}M
    EOF

        # Restart MariaDB to apply changes
        sudo systemctl restart mariadb
    fi
    ``

在配置好了这些文件之后，我们需要启动Slurm的服务：   

```bash         
sudo systemctl enable --now slurmctld   # 启动Slurm的控制节点
sudo systemctl enable --now slurmdbd    # 启动Slurm的数据库节点
sudo systemctl enable --now slurmd      # 启动Slurm的计算节点
```

## 配置Slurm计算节点

计算结点的配置会比较简单，我们只需要在计算节点上安装`munge`和`slurm`，然后配置`slurm.conf`文件即可. 配置`munge`和`slurm`的过程和上面的过程一样，这里就不再赘述了. 我们不需要安装`mariadb`，因为`mariadb`只需要在控制节点上安装即可. 因此在安装slurm的过程中有一些不同的地方：

```bash
sudo yum install python3 gcc openssl openssl-devel pam-devel numactl numactl-devel hwloc lua readline-devel ncurses-devel man2html libibmad libibumad rpm-build  perl-ExtUtils-MakeMaker.noarch -y
sudo yum install rpm-build make -y
sudo dnf --enablerepo=crb install rrdtool-devel lua-devel hwloc-devel -y

cd ~/rpmbuild/RPMS/x86_64/ # 由于是共享目录，所以之前在登陆节点安装好的内容应该在这里可以看到
sudo yum --nogpgcheck localinstall slurm-[0-9]*.el*.x86_64.rpm slurm-contribs-*.el*.x86_64.rpm slurm-devel-*.el*.x86_64.rpm slurm-example-configs-*.el*.x86_64.rpm slurm-libpmi-*.el*.x86_64.rpm slurm-pam_slurm-*.el*.x86_64.rpm slurm-perlapi-*.el*.x86_64.rpm slurm-slurmd-*.el*.x86_64.rpm -y # 不需要安装slurmctld和slurmdbd
```

在安装好了Slurm之后，我们需要对一些文件进行一些配置：

1. `slurm.conf`： 把控制节点的`slurm.conf`文件复制到计算节点上即可
2. `cgroup.conf`：Slurm的cgroup配置文件，同样把控制节点的`cgroup.conf`文件复制到计算节点上即可

在配置好了这些文件之后，我们需要启动Slurm的服务：   

```bash
sudo systemctl enable --now slurmd      # 启动Slurm的计算节点
```

## 测试Slurm

在配置好了Slurm之后，我们可以通过一些简单的命令来测试Slurm是否正常运行：

```bash
sinfo # 查看集群的节点信息
squeue # 查看集群的任务信息
srun hostname # 在集群上运行hostname命令
scontrol show node # 查看集群的节点信息
```

在测试的过程中，我们可以看到集群的节点信息，任务信息，同时我们可以在集群上运行一些简单的程序，来测试Slurm的任务调度是否正常. 比如`HPL`或者`OSU_Benchmarks`等等.