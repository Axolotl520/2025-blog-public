```python
def CountDigit(number,digit):
    count = 0
    for char in str(number):
        if char == str(digit):
            count += 1
    return count
```