---
title: Project Hub
date: 2025-01-04 16:03:00
tags: [Project, Computer Science]
categories: SUSTech
toc: true
---
Here I will constantly some of the projects I have been working on and the corresponding description of the projects. Currently, my interest mainly lies in the field Distributed System and Machine Learning. I am a participant for various super computing competition and I am thrilled to apply the power of supercomputer into solving some of the Machine Learning problems.

<!--more-->
<h2 class="heading-with-badge">CS109 Jungle
    <span class="badge" style="background-color:rgb(202, 49, 49);">Java
        <a href="https://github.com/Jaredanwolfgang/CS109_Project_Jungle" target="_blank">
            <img alt="github" src="/images/logos/github-mark-white.svg" width="30" height="30">
        </a>
    </span>
</h2>

> Contributors:
> 1. Mengxuan Wu
> 1. Yicheng Xiao

The project of CS109 aims at creating an interactive Jungle. During the project, we have realized the basic function, the AI module (Mengxuan Wu has implemented the hard AI with  Monte Carlo Tree Search, Yicheng Xiao has implemented the medium AI with min-max algorithms with alpha-beta pruning). Mengxuan Wu has further realized the multiplayer modes. Yicheng Xiao is responsible for the GUI. 

<h2 class="heading-with-badge">CS211 Electronic Organ
    <span class="badge" style="background-color:rgb(49, 82, 202);">Verilog
        <a href="https://github.com/Jaredanwolfgang/CS211_Electronic_Organ" target="_blank">
            <img alt="github" src="/images/logos/github-mark-white.svg" width="30" height="30">
        </a>
    </span>
</h2>

> Contributors:
> 1. Mengxuan Wu
> 2. Shengli Zhou
> 3. Yicheng Xiao

It is asked to implemented a Electronic Organ using FPGA board with verilog. Mengxuan Wu accounts for the memory module. Shengli Zhou accounts for input module and the state machine of the whole game. Yicheng Xiao accounts for Buzzer and VGA modules.

In the project, the Buzzer can support from C3 to C5 and can produce multiple notes at the same time. The VGA has been realized to top up the engagement of the game.


<h2 class="heading-with-badge">CS214 Pipelined CPU
    <span class="badge" style="background-color:rgb(49, 82, 202);">Verilog
        <a href="https://github.com/Jaredanwolfgang/CS214_Pipelined_CPU" target="_blank">
            <img alt="github" src="/images/logos/github-mark-white.svg" width="30" height="30">
        </a>
    </span>
</h2>

> Contributors:
> 1. Yicheng Xiao
> 2. Shengli Zhou
> 3. Haibin Lai

We have designed a pipelined RISC-V CPU with the following structure:
![Pipeline Structure](/images/project_hubs/pipeline.png)

We have realized the following instructions:
| Instruction | Encoding                      | Data Flow                                                      | Usage                   |
|-------------|-------------------------------|----------------------------------------------------------------|-------------------------|
| **R-Type Instruction**  | `Opcode: 0110011` |                                                               |                         |
| add         | funct7: 0x00 funct3: 0x0      | Register(rs1, rs2) -> ALU -> WB -> Register(rd)               | add rd, rs1, rs2        |
| xor         | funct7: 0x00 funct3: 0x4      | Register(rs1, rs2) -> ALU -> WB -> Register(rd)               | xor rd, rs1, rs2        |
| and         | funct7: 0x00 funct3: 0x7      | Register(rs1, rs2) -> ALU -> WB -> Register(rd)               | and rd, rs1, rs2        |
| **I-Type-Immediate Instruction** | `Opcode: 0010011` |                                                      |                         |
| addi        | funct3: 0x0                   | Register(rs1) \ ID(Imm) -> ALU -> WB -> Register(rd)          | addi rd, rs1, Imm       |
| xori        | funct3: 0x4                   | Register(rs1) \ ID(Imm) -> ALU -> WB -> Register(rd)          | xori rd, rs1, Imm       |
| andi        | funct3: 0x7                   | Register(rs1) \ ID(Imm) -> ALU -> WB -> Register(rd)          | andi rd, rs1, Imm       |
| slli        | funct3: 0x1                   | Register(rs1) \ ID(Imm) -> ALU -> WB -> Register(rd)          | slli rd, rs1, Imm       |
| srli        | funct3: 0x5                   | Register(rs1) \ ID(Imm) -> ALU -> WB -> Register(rd)          | srli rd, rs1, Imm       |
| **I-Type-Load Instruction** | `Opcode: 0000011` |                                                           |                         |
| lb          | funct3: 0x0                   | Register(rs1) \ ID(Imm) -> ALU -> DMem -> WB -> Register(rd)  | lb rd, Imm(rs1)         |
| lbu         | funct3: 0x4                   | Register(rs1) \ ID(Imm) -> ALU -> DMem -> WB -> Register(rd)  | lbu rd, Imm(rs1)        |
| lw          | funct3: 0x2                   | Register(rs1) \ ID(Imm) -> ALU -> DMem -> WB -> Register(rd)  | lw rd, Imm(rs1)         |
| **I-Type-Jump Instruction** | `Opcode: 1100111` |                                                           |                         |
| jalr        | funct3: 0x0                   | 1. Register(rs1) \ ID(Imm) -> ALU -> IF                       | jalr rd, Imm(rs1)       |
|             |                               | 2. IF(PC) -> ID -> ALU -> WB -> Register(rd)                  |                         |
| **I-Type-Ecall Instruction** |  `Opcode: 1110011` |                                                         |                         |
| **S-Type Instruction**    | `Opcode:0100011`  |                                                             |                         |
| sw          | funct3: 0x2                   | Register(rs1) \ ID(Imm) -> ALU -> DMem(Mem[rs1 + Imm] = rs2)  | sw rs2, Imm(rs1)        |
| **B-Type Instruction**    |  `Opcode: 1100011`   |                                                          |                         |
| beq         | funct3: 0x0                   | Register(rs1, rs2) -> ALU -> IF                               | beq rs1, rs2, Label     |
| bne         | funct3: 0x1                   | Register(rs1, rs2) -> ALU -> IF                               | bne rs1, rs2, Label     |
| blt         | funct3: 0x4                   | Register(rs1, rs2) -> ALU -> IF                               | blt rs1, rs2, Label     |
| bge         | funct3: 0x5                   | Register(rs1, rs2) -> ALU -> IF                               | bge rs1, rs2, Label     |
| bltu        | funct3: 0x6                   | Register(rs1, rs2) -> ALU -> IF                               | bltu rs1, rs2, Label    |
| bgeu        | funct3: 0x7                   | Register(rs1, rs2) -> ALU -> IF                               | bgeu rs1, rs2, Label    |
| **J-Type Instruction**    |  `Opcode: 1101111`    |                                                         |                         |
| jal         |                               | ID(Imm) -> ALU -> PC \ ID(PC) -> ALU -> WB -> Register(rd)    | jal rd, Label           |
| **U-Type Instruction**    |  `Opcode: 0110111`    |                                                         |                         |
| lui         |                               | ID(Imm) -> ALU -> WB -> Register(rd)                          | lui rd, Imm             |


<h2 class="heading-with-badge">CS305 Reliable Data Transfer
    <span class="badge" style="background-color:rgb(255, 231, 135); color: rgb(0,0,0);">Python
        <a href="https://github.com/Jaredanwolfgang/CS305_RDT_implementation" target="_blank">
            <img alt="github" src="/images/logos/github-mark.svg" width="30" height="30">
        </a>
    </span>
</h2>

> Contributors:
> 1. Yujun He
> 2. Zhaoyang Hong
> 3. Yicheng Xiao

For the socket package, we can only use the method for UDP, which is `recvfrom()` and `sendto()`. 
We need to use threads to maintain a "connection" between the client and the server, because the server needs to be able to handle multiple clients at once.
Each socket is binded to an address and a port, while connecting to a server, the client needs to know the address and the port of the server.
After the server gets the address and the port of the client, it will maintain a FSM with the according client to form a "connection".

<h2 class="heading-with-badge">SWS3004 GroupUp
    <span class="badge" style="background-color:rgb(135, 255, 255); color: rgb(0,0,0);">React
        <a href="https://github.com/Jaredanwolfgang/GroupUp_NUS_SWs_Project" target="_blank">
            <img alt="github" src="/images/logos/github-mark.svg" width="30" height="30">
        </a>
    </span>
</h2>

> Contributors:
> 1. Zhengdong Huang, Backend Design and Cloud Service Design
> 2. Hemu Liu, Backend Design and Cloud Service Design
> 3. Zihang Wu, Frontend Design
> 4. Yicheng Xiao, Frontend Design and Recommender Service Design

When our class begins, we are required to find our teammates. It is not uncommon that we tend to naturally group up with someone from the same universities because of familiarity. However, by grouping up like this, we cannot even get to know each other pretty well. Then this idea comes across us: We can design a cloud-based grouping application for this scenario! We aim to design a system where you can find your teammates based on recommendation!

<h2 class="heading-with-badge">CS323 Incredibuild
    <span class="badge" style="background-color:rgb(71, 63, 63);">Rust
        <a href="https://github.com/Jaredanwolfgang/CS323_Project_Incredibuild">
            <img alt="github" src="/images/logos/github-mark-white.svg" width="30" height="30">
        </a>
    </span>
</h2>

> Contributors:
> 1. Ben Chen
> 2. Yicheng Xiao
> 3. Jiarun Zhu

SPL(SUSTech Programming Language) Compiler in Rust. Current implementation mainly focuses on Compiler frontend, including Lexer, Parser, AST, Type Checker and LLVM IR generation. The backend we use is LLVM. The grammar supported is as follows:

```plaintext
// Program Structure
Program -> ProgramPart*
ProgramPart -> Stmt | FuncDec

// Declarations and Definitions
ParaDecs -> Comma<ParaDec>
StructDecs -> Comma<StructDec>
ArrayDecs -> Comma<CompExpr>
FieldsDec -> VarDef ";"?
           | FieldsDec VarDef ";"?
FuncDec -> Specifier Identifier "(" ParaDecs? ")" "{" Body "}"
DimDecs -> "[" CompExpr "]"
         | "[" CompExpr "]" DimDecs
FuncCall -> Identifier "(" ArgList? ")"
ArgList -> CompExpr | CompExpr "," ArgList
Comma<T> -> T | T "," Comma<T>

// Statements
Stmt -> "struct" Identifier "{" FieldsDec "}" ";"?
      | "include" "string"
      | Specifier VarDecs ";"
      | "if" "(" CondExpr ")" Expr
      | "if" "(" CondExpr ")" Expr "else" Expr
      | "while" "(" CondExpr ")" "{" Body "}"
      | "for" "(" VarManagement? ";" CondExpr? ";" VarManagement? ")" "{" Body "}"
      | VarManagement ";"
      | FuncCall ";"
      | "break" ";"
      | "continue" ";"
      | "return" CompExpr? ";"
      | "{" Body "}"

// Body
Body -> Expr*

// Expression
Expr -> OpenExpr | CloseExpr
OpenExpr -> "if" "(" CondExpr ")" Expr
          | "if" "(" CondExpr ")" Expr "else" OpenExpr
CloseExpr -> "if" "(" CondExpr ")" Expr "else" CloseExpr
           | WhileExpr
           | ForExpr
           | FuncCall
           | VarManagement ";"
           | "break" ";"
           | "continue" ";"
           | "return" CompExpr? ";"
           | "{" Body "}"

// While Expression
WhileExpr -> "while" "(" CondExpr ")" "{" Body "}"

// For Expression
ForExpr -> "for" "(" VarManagement? ";" CondExpr? ";" VarManagement? ")" "{" Body "}"

// Variable Management
VarManagement -> VarDef
               | VarDecs
               | Identifier DimDecs? "++"
               | Identifier DimDecs? "--"

// Variable Declarations and Definitions
VarDef -> Specifier Identifier DimDecs? "=" "{" StructDecs "}"
        | Specifier VarDecs
VarDecs -> VarDec | VarDec "," VarDecs
VarDec -> Identifier DimDecs?
        | Identifier DimDecs? "=" CompExpr
        | StructRef "=" CompExpr
        | Identifier DimDecs? "=" "{" ArrayDecs "}"
StructRef -> StructRef "." Identifier DimDecs?
           | Identifier DimDecs? "." Identifier DimDecs?

// Conditional Expression
CondExpr -> CondTerm
          | "!" CondExpr
          | CompExpr ">" CompExpr
          | CompExpr "<" CompExpr
          | CompExpr ">=" CompExpr
          | CompExpr "<=" CompExpr
          | CompExpr "==" CompExpr
          | CompExpr "!=" CompExpr
          | CondExpr "&&" CondExpr
          | CondExpr "||" CondExpr
CondTerm -> "bool"
          | "(" CondExpr ")"

// Computation Expression
CompExpr -> Term
          | CompExpr "%" CompExpr
          | CompExpr "*" CompExpr
          | CompExpr "/" CompExpr
          | CompExpr "+" CompExpr
          | CompExpr "-" CompExpr
          | CompExpr "&" CompExpr
          | CompExpr "|" CompExpr
          | CompExpr "^" CompExpr

// Term
Term -> "(" CompExpr ")"
      | Identifier DimDecs?
      | "+"? "int"
      | "-" "int"
      | "+"? "float"
      | "-" "float"
      | "char"
      | "string"
      | Identifier "(" ArgList? ")"
      | StructRef
      | "&" Identifier
      | "*" Identifier

// Type Specifiers
Specifier -> "typeint"
           | "typeint" "*"
           | "typefloat"
           | "typefloat" "*"
           | "typechar"
           | "typechar" "*"
           | "typestr"
           | "void"
           | "struct" Identifier
```

Based on the tools we use `Logos` and `lalrpop`, we have realized self-defined error-recovery mechanism that can detect lexical errors and syntax errors. In the analyzer module, we have conducted type checking and semantic analysis. As the last step, we use `inkwell` to generate LLVM IR code.

<h2 class="heading-with-badge">CS329 When AL and DA meets at OD 
    <span class="badge" style="background-color:rgb(255, 231, 135); color: rgb(0,0,0)">Python
        <a href="https://github.com/Jaredanwolfgang/CS329_Machine_Learning_Project">
            <img alt="github" src="/images/logos/github-mark.svg" width="30" height="30">
        </a>
    </span>
</h2>
{% note primary %}
The full name stands for "When Active Learning and Data Augmentation meets at Object Detection".
{% endnote %}

> Contributors:
> 1. Shengli Zhou
> 2. Yicheng Xiao

In this project, we studied the effect of Active Learning and Data Augmentation on Object Detection. We use infromation entropy and information gain as the criterion for Active Learning. Also, we chose different levels of Data Augmentation techniques. We used RTDETR-v2 as our pre-trained model and train it on the Kitti 3D Object Detection 2017 dataset. Through our finetuning process, we observed a correlation between the selection strategy and the according data augmentation strategy that can probably give us better understanding of the learning process and guide us what data should we choose to improve the performance. <a href="https://github.com/Jaredanwolfgang/Jaredanwolfgang.github.io/tree/main/source/report/Machine_Learning_Project_Final_Report.pdf" target="_blank">Check out the report here!</a>

<img src="/images/project_hubs/AL_process_combined.png" alt="AL_DA_OD" style="zoom:50%;" />


<h2 class="heading-with-badge">CS334 VirtIO for crypto device on Asterinas 
    <span class="badge" style="background-color:rgb(71, 63, 63);">Rust
        <a href="https://github.com/Jaredanwolfgang/CS334_Operating_System_VirtIO">
            <img alt="github" src="/images/logos/github-mark-white.svg" width="30" height="30">
    </span>
</h2>

This is a simple implementation of a VirtIO crypto device. The device is a PCI device that can be used to encrypt and decrypt data. The device is implemented in QEMU. <a href="https://github.com/Jaredanwolfgang/Jaredanwolfgang.github.io/tree/main/source/report/CS334_VirtIO_Project_Report.pdf" target="_blank">Check out the report here!</a>


We have implemented the following features:
- [x] Symmetric Algorithm
    - [x] Cipher (Encrypt/Decrypt)
    - [x] Chain Algorithm
        - [x] Hash Algorithm (Encrypt/Decrypt)
        - [ ] MAC Algorithm (Encrypt/Decrypt)
- [x] AKCIPHER Algorithm (Encrypt/Decrypt/Sign/Verify)
- [x] Writing Test Cases
- [x] Asynchronous Request
- [x] User Call

<h2 class="heading-with-badge">Academic Record
    <span class="badge" style="background-color:rgb(255, 128, 0);">SUSTech</span>
</h2>

| **Course Code** | **Course Name** | **Semester** | **Instructor** | **Final Grade** |
| :-------------: | :-------------: | :----------: | :------------: | :-------------: |
| **MA117** | **Calculus I** | 2022 Fall | Rong Wang | 99 |
| **MA127** | **Calculus II** | 2023 Spring | Rong Wang | 99 |
| **MA113** | **Linear Algebra** | 2022 Fall | Yimao Chen | 97 |
| **CS104** | **Introduction to Mathematical Logic** | 2023 Spring | Mingxin He | 100 |
| **CS109** | **Introduction to Computer Programming** | 2023 Spring | Jianqiao Yu | 98 |
| **CS211** | **Digital Logic (H)** | 2023 Fall | Yuhui Bai | 97 |
| **CS213** | **Principles of Database Systems (H)** | 2023 Fall | Shiqi Yu | 96 |
| **CS214** | **Computer Organization (H)** | 2024 Spring | Yuhui Bai | 97 |
| **CS215** | **Discrete Matrhematics (H)** | 2023 Fall | Qi Wang | 86 |
| **CS216** | **Algorithm Design and Analysis (H)** | 2024 Spring | Shan Chen | 91 |
| **CS217** | **Data Structures and Algorithms Analysis (H)** | 2023 Fall | Pietro Simone Oliveto | 97 |
| **CS305** | **Computer Networks** | 2024 Spring | Zhuozhao Li | 92 |
| **CS311** | **Artificial Intelligence (H)** | 2024 Spring | Bo Yuan | 83 |
| **CS323** | **Compiler** | 2024 Fall | Yepang Liu | 95 |
| **CS329** | **Machine Learning** | 2024 Fall | Qi Hao |  |
| **CS334** | **Operating System** | 2024 Fall | Yiqian Zhang |  |
| **MA212** | **Probability and Statistics** | 2023 Fall | Yiwei Zhang | 95 |