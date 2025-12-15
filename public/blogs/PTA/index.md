# 6-1 缩写词
![](/blogs/PTA/6f002fe2826bd39c.png)
要解决这个问题，我们需要编写一个函数来生成短语的缩写词，核心思路是提取每个单词的首字母并转换为大写，最后拼接这些字母。

### 完整代码实现
```python
def acronym(phrase):
    # 将短语按空格分割成单词列表（自动处理多个空格）
    words = phrase.split()
    # 提取每个单词的首字母并转为大写，拼接成缩写词
    abbr = ''.join([word[0].upper() for word in words])
    return abbr
```
# 6-2 函数计算
![](/blogs/PTA/94520236a21ccbe3.png)
要解决这个问题，核心是通过循环累加计算数列的和：从 `1/(1+1)` 开始，依次累加到 `i/(i+1)`，最终返回累加结果。具体步骤为：
1. 初始化一个浮点型累加变量（避免整数除法误差）；
2. 遍历从 1 到 `i` 的所有整数，每次将 `n/(n+1)` 累加到变量中；
3. 返回累加结果。

### 完整代码实现
```python
def f(i):
    total = 0.0  # 初始化累加和为浮点数，避免整数除法问题
    for n in range(1, i + 1):
        total += n / (n + 1)  # 累加每一项 n/(n+1)
    return total
```

### 或者从大到小循环
```python
def f(i):
    sum = 0
    while i >= 1:	# 注意跳出循环的条件
        sum += i/(i+1)
        i -= 1
    return sum
```
# 6-3 计算工资
## 注意根据本题的输入输出样例判断薪资计算方法
![](/blogs/PTA/fbcc8479662fa28d.png)
![](/blogs/PTA/e9c45a9e52377ae5.png)
要计算员工工资，需根据工作时长分三档计算薪酬：
1. **≤40小时**：按正常小时工资计算；
2. **40~60小时**：40小时按正常工资，超出40的部分按1.5倍工资计算；
3. **>60小时**：40小时正常工资 + 40~60小时（20小时）按1.5倍工资 + 超出60小时的部分按2倍工资计算。

### 完整代码实现
```python
def pay(salaryHour, hours):
    # 分情况计算工资
    if hours <= 40:
        total_salary = salaryHour * hours
    elif 40 < hours <= 60:
        # 40小时正常工资 + 超出40小时的1.5倍工资
        normal_pay = 40 * salaryHour
        overtime1_pay = (hours - 40) * salaryHour * 1.5
        total_salary = normal_pay + overtime1_pay
    else:
        # 40小时正常 + 20小时1.5倍 + 超出60小时的2倍
        normal_pay = 40 * salaryHour
        overtime1_pay = 20 * salaryHour * 1.5  # 40-60小时的20小时
        overtime2_pay = (hours - 60) * salaryHour * 2
        total_salary = normal_pay + overtime1_pay + overtime2_pay
    return total_salary
```
# 6-4 函数练习：做好份内的求和工作
![](/blogs/PTA/6adb404a11b328fc.png)
![](/blogs/PTA/7d4cc1ef49546af2.png)
要计算正整数从左往右奇数位置的各位数字之和，核心思路是：
1. 将数字转为字符串，方便按“位置”遍历每一位数字（字符串索引从0开始，对应数字的第1位、第2位……）；
2. 数字的“奇数位置”（第1、3、5…位）对应字符串的“偶数索引”（0、2、4…）；
3. 遍历字符串，累加所有偶数索引位置的数字值，最终返回累加和。

### 完整代码实现
```python
def sum_num(n):
    # 将数字转为字符串，便于按位置遍历
    s = str(n)
    total = 0  # 初始化奇数位置数字和
    # 遍历字符串索引，偶数索引对应数字的奇数位置
    for i in range(len(s)):
        if i % 2 == 0:
            total += int(s[i])  # 转换为整数并累加
    return total
```
### 如果想简化（） 
也可以用列表推导式一行完成累加，逻辑和上面一致：
```python
def sum_num(n):
    str_num = str(n)
    return sum(int(str_num[i]) for i in range(len(str_num)) if i % 2 == 0)
```
这个写法更简洁，核心逻辑和前面的代码完全相同，只是用生成器表达式直接传给`sum()`内置函数，效率更高。
# 6-5 求多项式的值
![](/blogs/PTA/250e9b8624c6486e.png)
![](/blogs/PTA/0d129bb590cc7e0f.png)

多项式列表的**索引对应x的次数**：例如列表`[1,3,0,0,9]`中，索引0对应`x⁰`（常数项），系数为1；索引1对应`x¹`，系数为3；索引4对应`x⁴`，系数为9。
计算逻辑：遍历列表的每个元素，按「系数 × x^次数」计算每一项的值，最后累加所有项的结果，得到多项式的值。

### 完整代码实现
```python
def polyvalue(lst, x):
    total = 0.0  # 初始化累加和为浮点数，保证精度
    # 遍历列表，enumerate同时获取索引（次数）和系数
    for power, coeff in enumerate(lst):
        total += coeff * (x ** power)  # 计算每一项并累加
    return total
```
# 7-1 逆序数的逆序和
![](/blogs/PTA/bc32cc9e232dd0f8.png)
要解决“逆序数的逆序和”问题，核心步骤可拆解为：
1. **逆序处理单个数字**：将数字转为字符串，通过切片反转字符串，再转回整数（自动忽略前导零）；
2. **求和与二次逆序**：对两个逆序后的数字求和，再对和执行一次逆序处理（同样忽略前导零）；
3. **批量处理测试用例**：先读取测试组数，再循环处理每组输入。

### 完整代码
```python
# 读取测试数据组数
T = int(input())
# 循环处理每组测试数据
for _ in range(T):
    # 读取一组的两个正整数（字符串形式，方便逆序）
    a_str, b_str = input().split()
    # 逆序并转整数（自动去掉前导零）
    rev_a = int(a_str[::-1])
    rev_b = int(b_str[::-1])
    # 逆序后求和
    sum_ab = rev_a + rev_b
    # 对和逆序，转整数去掉前导零后输出
    rev_sum = int(str(sum_ab)[::-1])
    print(rev_sum)
```
# 7-2 阶乘累加求和
![](/blogs/PTA/89ec07929a18346b.png)
要解决阶乘累加求和问题，需拆解为两个核心步骤：
1. **阶乘函数实现**：定义`fact(n)`函数，计算单个正整数`n`的阶乘（`n! = 1×2×…×n`，特殊地，`0! = 1! = 1`）；
2. **累加求和**：遍历1到输入的正整数`n`，调用`fact()`函数计算每个数的阶乘，累加所有结果得到总和。

### 完整代码
```python
# 定义阶乘函数：计算n的阶乘
def fact(n):
    if n == 0 or n == 1:  # 0!和1!的结果都是1
        return 1
    result = 1
    for i in range(2, n + 1):  # 从2开始累乘到n
        result *= i
    return result

# 读取输入的正整数n
n = int(input())
# 初始化累加和
total = 0
# 遍历1到n，累加每个数的阶乘
for i in range(1, n + 1):
    total += fact(i)
# 输出累加和
print(total)
```
# 7-3 lambda表达式的使用
![](/blogs/PTA/42833a64d9657ecf.png)
要解决这个问题，核心是利用 `sorted()` 内置函数结合 lambda 表达式实现按总成绩降序排序，步骤拆解如下：
1. **读取输入数据**：先读取学生数量，再逐行读取每个学生的姓名和三门成绩，将成绩转为整数并存储到序列中；
2. **定义排序规则**：通过 lambda 表达式计算每个学生的总成绩（三门成绩之和），作为 `sorted()` 的排序依据；
3. **降序排序**：设置 `reverse=True` 实现总成绩从高到低排序；
4. **输出结果**：遍历排序后的序列，按格式输出每个学生的信息。

### 完整代码
```python
# 读取学生数量
n = int(input())
# 初始化列表存储学生信息（姓名+三门成绩）
students = []
for _ in range(n):
    # 拆分每行输入，获取姓名和成绩
    info = input().split()
    name = info[0]
    # 成绩转为整数，避免字符串求和错误
    ds = int(info[1])
    db = int(info[2])
    c = int(info[3])
    # 将学生信息以元组形式存入列表（元组不可变，适合排序）
    students.append((name, ds, db, c))

# 按总成绩降序排序：lambda表达式计算总成绩，reverse=True降序
sorted_students = sorted(students, key=lambda x: sum(x[1:]), reverse=True)

# 输出排序后的学生信息
for stu in sorted_students:
    # 按“姓名 成绩1 成绩2 成绩3”格式输出
    print(f"{stu[0]} {stu[1]} {stu[2]} {stu[3]}")
```
# 7-4 字典应用--用户登录
![](/blogs/PTA/6f442dea2d12bcc2.png)
要实现用户登录验证功能，核心逻辑是：
1. 定义预设的用户信息字典；
2. 限制最多3次登录尝试，每次尝试读取用户名和密码；
3. 验证用户名是否存在且密码匹配：匹配则输出“登录成功”并终止循环，不匹配则输出“登录失败”并累计尝试次数；
4. 若3次尝试均失败，最终仍输出“登录失败”（题目样例未涉及此场景，但逻辑需完整）。

### 完整代码
```python
# 定义预设的用户信息字典
dic = {'admin':'123456','administrator':'12345678','root':'password'}
# 最大尝试次数
max_attempts = 3
# 初始化尝试次数计数器
attempt = 0

# 循环进行登录验证，最多3次
while attempt < max_attempts:
    # 读取用户名和密码（去除首尾可能的空格，避免输入误差）
    username = input().strip()
    password = input().strip()
    # 验证用户名和密码
    if username in dic and dic[username] == password:
        print("登录成功")
        break  # 匹配成功，退出循环
    else:
        print("登录失败")
        attempt += 1  # 尝试次数+1
```
# 7-5 字典输入输出
![](/blogs/PTA/4c612899192978c0.png)
## 字典键值对互换  非常ez
### 完整代码
```python
# 读取输入的字典格式字符串，转换为字典对象
original_dict = eval(input())
# 初始化空字典存储键值对换后的结果
new_dict = {}
# 遍历原字典的键值对，实现键值互换
for key, value in original_dict.items():
    new_dict[value] = key
# 输出互换后的字典
print(new_dict)
```
# 7-6 Python字典-学生成绩统计
![](/blogs/PTA/549fa34b66964326.png)
## 考查字典的应用，其实不难，ex就ex在他要你输出的东西很杂
1. **按成绩降序排序字典**：提取字典的键值对，以成绩（值）为排序依据降序排列，再转回有序字典；
2. **计算平均分**：求和所有成绩，除以学生数量，结果保留两位小数；
3. **查找并输出最高分学生**：先获取最高分，再遍历字典筛选出所有成绩等于最高分的学号和成绩，逐个输出。

### 完整代码
```python
# 读取输入的字典格式字符串，去除首尾空格后转为字典（兼容输入前导/后置空格）
score_dict = eval(input().strip())

# 1. 按成绩从高到低排序字典
# sorted返回(学号, 成绩)的元组列表，key取成绩(x[1])，reverse=True降序
sorted_items = sorted(score_dict.items(), key=lambda x: x[1], reverse=True)
sorted_dict = dict(sorted_items)  # 转为有序字典（Python3.7+字典保留插入顺序）
print(sorted_dict)

# 2. 计算平均分（精确到两位小数）
total_score = sum(score_dict.values())  # 总成绩
student_count = len(score_dict)         # 学生数量
avg_score = total_score / student_count
print(f"平均分={avg_score:.2f}")

# 3. 输出最高分的同学
max_score = max(score_dict.values())    # 获取最高分
print("最高分:")
# 遍历字典，筛选出成绩等于最高分的学号和成绩
for sid, score in score_dict.items():
    if score == max_score:
        print(f"{sid}:{score}")
```
# 7-7 统计各行业就业的学生数量，按数量从高到低方式输出
![](/blogs/PTA/0aa3762d941ab01d.png)
要解决行业就业数量统计并按数量降序输出的问题，核心步骤为：
1. **输入处理**：读取输入字符串，按空格分割为行业名称列表（自动处理多余空格和首尾空格）；
2. **数量统计**：使用`collections.Counter`快速统计每个行业的出现次数（替代手动遍历字典统计，更简洁高效）；
3. **降序排序**：按统计的数量从高到低排序；
4. **格式输出**：按“行业名:数量”的格式输出（英文冒号，无多余空格）。

### 完整代码
```python
from collections import Counter

# 读取输入并分割为行业列表（自动处理多个空格/首尾空格）
industry_str = input().strip()
industry_list = industry_str.split()

# 统计每个行业的出现次数
count_result = Counter(industry_list)

# 按数量降序排序（key取统计值，reverse=True降序）
sorted_result = sorted(count_result.items(), key=lambda x: x[1], reverse=True)

# 按指定格式输出
for industry, num in sorted_result:
    print(f"{industry}:{num}")
```

### 若不使用`Counter`，可通过字典手动统计，逻辑完全一致：
```python
# 读取输入并分割
industry_str = input().strip()
industry_list = industry_str.split()

# 手动统计次数
count_dict = {}
for industry in industry_list:
    if industry in count_dict:
        count_dict[industry] += 1
    else:
        count_dict[industry] = 1

# 降序排序并输出
sorted_result = sorted(count_dict.items(), key=lambda x: x[1], reverse=True)
for industry, num in sorted_result:
    print(f"{industry}:{num}")
```