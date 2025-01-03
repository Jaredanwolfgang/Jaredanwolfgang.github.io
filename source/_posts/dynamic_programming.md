---
title: 动态规划笔记整理
date: 2025-01-03 20:17:00
tags: [Algorithm, Dynamic Programming]
categories: Algorithm
toc: true
mathjax: true
---

动态规划实在是学的让人头大，很多问题也分析的不是很清楚，感觉有必要要把学习到的知识做一个整理和归纳。学习的路径是先从课本上举的例子开始，然后会对作业的题目做一个简单回顾，后面是根据OI-Wiki上面提及的知识点的一些整理归纳。

<!-- more -->

> 写在前面：对于动态规划问题，我觉得最难受的地方不在于写代码。和所有问题不同，动态规划的代码量非常少，但是往往设计不好就会导致很高的时间复杂度和空间复杂度，对于动态规划状态的定义和对于动态规划的时间空间优化都是需要深入探讨的课题。不知道有多少时间来完成这个笔记，于是写到哪里就记录到哪里吧。
> 

# 课本上的动态规划问题

在课堂中，使用的教材是Jon Kleinberg 和 Eva Tardos 的 Algorithm Design，课本中的例子都十分经典，由浅入深，详细讲到了各种有关动态规划的各个方面和需要关注到的一些优化的细节。

{% note primary %}
💡 Those who cannot **remember the past** are condemned to repeat it.
{% endnote %}

**基础篇：**

1. Weighted Interval Scheduling 
    1. 从贪心到动态规划：动态规划可以解决什么问题？
    2. 动态规划的两种策略：Top-down和Bottom-up
2. Maximum Subarray Problem
    1. Kadane’s Algorithm：通过提前将所需数据存储起来降低时间复杂度
    2. Bentley’s Algorithm：二维推广
3. Segmented Least Squares
    1. **时间复杂度降低思维**应用
4. Knapsack Problem
    1. 经典背包问题，复杂变体非常多样
    2. 完全背包问题、多重背包问题等等
    3. **空间压缩思维**应用
5. RNA Secondary Structure
    1. 条件限制下的动态规划问题
    2. 遍历顺序对于动态规划问题的重要性

**进阶篇：**

1. Sequence Alignment
    1. Hirschberg’s Algorithm：**分治思想**和动态规划问题的结合，降低空间复杂度
2. Longest Common Sequence
3. Bellman-Ford-Moore Algorithm
4. Distance-vector Protocols
5. Negative Cycles

## Bellman-Ford-Moore Algorithm

最简单的BFM算法可以用下面的表达式直接表述：

> If $i>0$ then:
$\text{OPT}(i,v)=\min(\text{OPT}(i-1, v), \min_{w\in V}(\text{OPT}(i-1,w) + c_{vw}))$
> 
1. $P$ uses at most $i-1$ edges.
2. If the path uses $i$ edges and the first edge is $(v,w)$, then $\text{OPT} (i,v) = \text{OPT} (i,w) + c_{vw}$

The pseudo code can be written as follows: 

![Untitled](/images/dynamic_programming/Untitled.png)

时间复杂度： $O(n^3)$ 

空间复杂度： $O(n^2)$

显然这是有很大的优化空间的

## Improvements

### Basic Time Improvement

时间复杂度是$O(n^3)$的原因有我们默认每次寻找最小值的时候都会花费$O(n)$的时间，而实际上，我们只用遍历某个节点的邻接节点因此对应的不是$O(n^2)$的复杂度，而是$O(\sum_{v\in V} n_v)$的时间复杂度，这个总数跟边的数量密切相关，即$O(m)$。因此总的时间复杂度应该是$O(nm)$

### Space Improvement

可以发现，上述的Recurrence Relation虽然涉及到$i$ 和$i-1$的关系，但是本质上，其实只是需要前一状态留下来的信息，利用正确的遍历顺序，我们就可以减少其中一个维度。

因此我们的Recurrence Relation可以写为：

> $\text{OPT}(v)=\min(\text{OPT}(v), \min_{w\in V}(\text{OPT}(w) + c_{vw}))$法
> 

### Pull-based Algorithm

上面讲述的算法本质上是一种拉取信息的算法，也就是我们在每一次遍历的时候，都让每个节点从相邻的节点拉取一次$\text{OPT}(w)$的信息。用计算机网络的知识来理解就是Router在每次转发数据之前都会从相邻的Router获取一次到目标节点Latency的信息。在大部分节点没有更新的情况下，Pull-based Algorithm 就会进行相当多无效的拉取操作。

### Push-based Algorithm

进行了Push-based优化后的算法有一个新的名字：SPFA(Shortest Path Faster Algorithm)也可以理解成是BFM算法进行队列优化后的结果。Push-based的优化基于一个假设，就是我们只希望遍历那些被更新过的节点的邻接节点（因为大概率这些邻接节点也会被更新），为了维持这种特性，我们需要一个队列来维护这个性质。也就是每次都把会被更新的节点添加到这个队列当中。

![Untitled](/images/dynamic_programming/Untitled%201.png)

![Untitled](/images/dynamic_programming/Untitled%202.png)

![Untitled](/images/dynamic_programming/Untitled%203.png)

第二种方式是我们提及的用队列来优化的伪代码。

## Question

1. 我们希望找到最短路径，如何去寻找最短路径
2. 我们希望判断其中的负环，如何去检测负环
3. 在Push-based的方法中，我们算法复杂度虽然提升了，但是出现了信息差的问题（因为信息是Local的），比如下面这种情况：

![Untitled](/images/dynamic_programming/Untitled%204.png)

当我们的$(v,t)$删除后，该条路径的Cost会趋近于正无穷，但是$s$处的最短路径并没有更新，$(s,t)$仍然是$2$，那么$v$根据贪心法则就会把$(v,t)$的权重设置成$3$，$s$接着更新的时候就会在$v$的基础之上设置成$4$，彼此形成一个无穷无尽的回路。要如何解决？

# Lab 8 和 Lab 9 中的动态规划问题

## Lab 8A

一个背包问题的变种，多重背包问题，在后面会详细展开讲，此处跳过。

## Lab 8B

[洛谷题目链接](https://www.luogu.com.cn/problem/P2592)

![Untitled](/images/dynamic_programming/Untitled%205.png)

此题目是一个非常容易误判的题目，让人对此题的难度产生错误预估。将在这里阐述一下我一开始的天真想法，和在hyj同志指点之后的改正思路。

### 问题分析

题面其实非常简单，简单可以理解成一个长度为$n+m$的$01$字符串其中有$n$个$1$和$m$个$0$，要保证任意连续的一段$1$和$0$的个数之差不超过$k$，也就是题目中的三个输入。（注意从题目描述转化的时候，要注意每个$1$是否是相同的，还是说是不同的$1$，是否要计算排列问题，这里从样例可以判断应该是不区分$1$是否相同的）

### 天真的思路

> 我真傻，真的，如果提前看到了数据范围，难道还会想出这么Naive的解题思路吗？ —追悔莫及的登
> 

是的，从数据的大小判断，该题的时间复杂度应该在$O(n^3)\sim O(n^4)$之间，不然范围不可能这么小，空间复杂度应该也在$O(mnk)$。因此当我发现天真的思路竟然在$O(n^2)$就解决了问题的时候就应该意识到不对劲，但是我还是很自信的提交的我的构思代码～喜提10分。

我的状态转移方程是这么构建的：

$$
dp(i,j)=dp(i, j - 1) +
dp(i-1, j)

$$

在遍历过程中，我对$i-j>k$或者$j-i>k$的都进行了特判。这个状态转移方程前一部分是第$i$个位置坐男生，后一部分是第$i$个位置坐女生。很显然这个思路是有问题的，因为我进行的特判只能确保从开始到$i$这个位置整个字符串是满足小于等于$k$的要求的，但是没有办法满足其中的每一个都满足，比如说：

```c
00001111111 // 假设此处k=5，显然每一步都是可以通过特判的，但是仍然不符合题目要求
```

### 正确的思路

从一个直观的角度思考我这个做法，其实就是在做一个最短路径查找问题：即从$(0,0)$到达$(n,m)$要么向上走，就是选择了$1$的情况，要么向右走，就是选择了$0$的情况。这个思路没有问题，问题出在，我其实只是保证了整体始终处于 $y=x+k$和$y=x-k$之间，而实际上该问题需要保证的是，每个走法最大的$max = y_1-x_1$ 和最小的$min = y_2-x_2$之间不能超过$k$。（怕讲不清楚于是画了下面这张图，图中是个显然不合法样例）

![Untitled](/images/dynamic_programming/Untitled%206.png)

那我们现在可能就要考虑一个问题了，如何在原有的基础之上作出一些修改就能得到我们的结果呢？其实从我们上述的分析中已经可以得出了，我们还需要记录的状态就是这个最大值和最小值，要保证每一次递归的时候最大值和最小值之差不能超过要求。那么其实我们需要的就是一个四层的状态转移方程，需要注意的是，由于我们定义的是一个状态，状态转移方程从现在推未来会更加方便，而如果从过去推现在，我们无法提前预知$max$和$min$的大小。（此处状态方程仅仅将$min$修改为$0$减去$1$的个数，其实就是取了一个绝对值，因为$min$最大不会超过$0$，$max$最小不会小于$0$，这么写有利于代码的书写。

$$
\begin{cases}
dp[i+1][j][S_1+1][\max(S_2-1,0)] += dp[i][j][S_1][S_2]\\
dp[i][j+1][\max(S_1-1,0)][S_2+1] += dp[i][j][S_1][S_2] 
\end{cases}
$$

最后是遍历顺序，此处对于遍历顺序没有什么讲究，因为是加和而不是替换，原有的都会被保留下来，但是要注意初始化，不然可能加出来的答案有问题。

最后结果应该是$S_1\in [0,k], S_2\in [0,k]$的所有解加和。

## Lab 9A

![Untitled](/images/dynamic_programming/Untitled%207.png)

这个题目是一个Sequence Alignment问题，甚至不能算变体，因为状态转移方程完全一样，简单列一下:

$$
dp(i,j)=\begin{cases}
j\delta & i=0\\
i\delta & j=0\\
\min\left(\begin{cases}\alpha(i,j) + dp(i-1,j-1)\\ \delta+dp(i-1,j)\\ \delta+dp(i,j-1)\end{cases}\right) & otherwise
\end{cases}
$$

## Lab 9B

[洛谷题目链接](https://www.luogu.com.cn/problem/P2470)

![Untitled](/images/dynamic_programming/Untitled%208.png)

又是一道非常难顶的题目 T T，自己天真的思路虽然没有之前那么天真了，但是还是没有办法把所有情况考虑周全，而且算法虽然结果似乎正确，但是非常不高效（更好笑的是错误的思路竟然可以通过学校的OJ，可见数据其实不是很紧）

### 问题分析

这个问题就比Lab8的问题要稍微难分析一丢丢了，以至于我今早之前（4月23日）一直按着错误的思路在反复摸索，然后今天一读题发现不太对劲。

题目提出的是一种压缩算法，用两个字符来对字符串进行压缩：

- “B”代表了压缩的开始，并不代表任何的字符
- “R”代表了将从字符“B”后到“R”前的字符串重复一遍

有几个要注意的地方（也是为什么我的代码会有问题的地方）：

- 如果开始压缩的地方在开头，那么“B”可以省略（这是个很好的条件，也是个很好的提示，但是我完全忽略掉了）
- “R”只跟最近的“B”字符进行匹配（那么就提醒我们在想进行多重压缩时，有些压缩是进行不了的，因为没有办法还原，这就是我没考虑到的问题）

如果要举一些例子的话比如：

```c
kabaabaabaabaxabaabaabaaba => kBabaRRxBabaRR
kabaabaabaabaabaabaabaabax => kBabaRRRx // 可以发现这种压缩其实是一种指数级别的压缩，如果重复片段很多的话会有很高效的压缩效果，以及这种指数级别的压缩也方便了我们的判断
kacabaabaabaabaacabaabaabaaba => kBacBabaRRR x kacBabaRRacBabaRR v // 示范，此处最后一个R本来应该和第一个B匹配，但是由于歧义问题最后其实是不能压缩的
```

### 天真的思路

其实一开始拿到这个题目是完全无法下手的，感觉和平时的$dp$问题差别有点大，但是在看了一段时间OI Wiki并且成功把自己折磨到之后，我发现这个问题大概应该是用区间$dp$来解决，向zygg求证之后，我开始在错误的道路上越错越远…

我的想法很简单，就是与普通的区间$dp$无异：

$$
dp(i,j)=\min(dp(i,j), dp(i,k)+dp(k,j))
$$

但是和普通的区间$dp$有差别的地方在于，我需要判断合并后的压缩长度会不会比拆分开来的任意长度更低。那么我最开始使用的方法就是直接判断

1. 从$i$位置开始枚举，不断把$len$的长度翻倍来看是否能够符合要求，不符合要求就标记无法压缩

```cpp
bool flag = true;
int r_cnt = 0;
int t = i + len;
for(; t + len <= j + 1;){
		if(s.substr(t, len) != s.substr(i, len)){
		    flag = false;
        break;
		}
		r_cnt++;
	  t += len;
    len <<= 1;
}
```

1. 然后判断是什么情况，该段最小压缩（包括$B$）加起来压缩后需要几个字符串，对边界条件进行一个特判

```cpp
if(i == 0){
		if(t == j + 1){
		    dp[i][j] = min(dp[i][j], dp[i][k] + r_cnt);
    }else{
			  dp[i][j] = min(dp[i][j], dp[i][k] + r_cnt + dp[t][j]);
    }
}else{
    if(t == j + 1){
		    dp[i][j] = min(dp[i][j], 1 + dp[i][k] + r_cnt);
    }else{
		    dp[i][j] = min(dp[i][j], 1 + dp[i][k] + r_cnt + dp[t][j]);
    }
}
```

这种做法可以通过OJ上的题目，但是没有办法通过洛谷的题目（只有$40\%$的正确率），然后我就陷入了深深的怀疑，不知道自己哪里出了问题。其实问题在前面也已经提及了，对于 `kacabaabaabaabaacabaabaabaaba` 这个字符串，我的算法就会很好地掉入陷阱当中。（谁叫我是蠢蛋呢？）于是在题解的帮助下，我理解了这道题目的正确思路

### 正确的思路

对于这道题目其实利用区间$dp$问题来解决最大的阻碍是$B$需要放置的位置，即在$dp$合并的过程中$B$应当是放置在区间内部还是默认在区间的左侧，还是包括在区间的内部：

![Untitled](/images/dynamic_programming/Untitled%209.png)

题目条件也给了我们提示，在$i=0$的情况下，$B$是可以直接忽略的，那么这就说明我们在合并的过程中，直接默认是第二种情况，也就是考虑$B$是出现在每个部分的前面，那么对于区间$[i,j]$如果要进行合并，那么我们只用分两种情况讨论：

1. 这个区间里面没有其他的$B$出现了
2. 这个区间里面还有其他的$B$

因此我们在原有的基础之上还需要拓展一个状态：$dp(i,j,0)$表示区间$[i,j]$上没有$B$，$dp(i,j,1)$表示区间$[i,j]$上有$B$。那么我们的状态转移方程就可以写成

$$
\begin{cases}
dp(i,j,0)=\min(dp(i,j,0), dp(i,k,0)+j-k) \\
dp(i,j,1) = \min(dp(i,j,1), \min(dp(i,k,0), dp(i,k,1)) + 1 + \min(dp(k+1,j,0), dp(k+1,j,1))
\end{cases}
$$

![Untitled](/images/dynamic_programming/Untitled%2010.png)

现在有一个问题就是要对所有的$dp(i,j,0)$进行预处理，提前判断最小单元是否可以压缩，不然没有办法继续进行状态转移，由于前面提及了我们的压缩是指数压缩，所以其实我们的 `check` 是只需要检查前半部分和后半部分是否相同，这样就可以看一个子字符串是否具有压缩的潜力。

```cpp
bool check(int l, int r){
    int len = r - l + 1;
    if(len % 2 == 1) return false;
    len >>= 1;
    if(s.substr(l , len) != s.substr(l + len, len)){
        return false;
    }
    return true;
}
if(check(i, j)){
		int mid = (i + j) >> 1;
    dp[i][j][0] = min(dp[i][mid][0] + 1, dp[i][j][0]); //初步压缩
}
```