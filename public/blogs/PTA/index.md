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
# 6-2 函数计算 - 《Python编程基础及应用》第2版，习题7-5
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