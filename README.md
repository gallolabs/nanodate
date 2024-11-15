<p align="center">
    <img height="200" src="https://raw.githubusercontent.com/gallolabs/nanodate/main/logo_w200.jpeg">
  <p align="center"><strong>Gallo Nanodate</strong></p>
</p>

A javascript date with nano precision

```typescript
import NanoDate from '@gallolabs/nanodate'
const nanodate = new NanoDate()

console.log(nanodate.toJSON())
// 2024-10-25T22:46:17.894315765Z

console.log(nanodate.getTime())
// 1729898417176787742n

const nanodate = new NanoDate('2024-10-25T22:46:17.894315765+02:00')

console.log(nanodate.toJSON())
// 2024-10-25T20:46:17.894315765Z

nanodate.setYear(2023)
NanoDate.now()
// ... Date compatible excepts get/setMilliseconds migrated to get/setNanoseconds
```

## Precision interest

- Nano precision is used by various applications and so is a known and liked precision
- Nano precision seems not to be interesting so small, and is not accurate as get it needs a non-negligeable nanoseconds
- Nanodate should not be used if milliseconds is good enough : Nanodate is less performant
- Nanodate is good to have more precision than milliseconds and two Nanodate instanciation cannot have the same nanoseconds (a priori). It is so a good timestamp for nearby events, like logs, to ensure the order.

### Precision (with a small piece of code, on my PC with WSL) :
- Nanodate now() ~ 122ns <=> 0.15 µs <=> 0.00015 ms precision (6500x Date)
- Nanodate instanciation ~ 430ns <=> 0.5 µs <=> 0.0005 ms precision (2000x Date)
- Nanodate instanciation + get time ~ 827ns <=> 1 µs <=> 0.001 ms precision (1000x Date)
- Nanodate instanciation + format as string ~ 1500ns <=> 2 µs <=> 0.002 ms precision (500x Date)

### Cost
- Nanodate now() ~ 122ns vs Date 79ns (x1.5) vs hrtime bigint 141ns (0.9x)
- Nanodate instanciation ~ 430ns vs Date 175ns (x2.5) vs hrtime bigint 141ns (x3)
- Nanodate instanciation + get time ~ 827ns vs Date 150ns (x5.5)
- Nanodate instanciation + format as string ~ 1500ns vs Date 994ns (x1.5)

+ memory

The results are not accurate as it depends of the hardware, the v8 optimisations (kept here to be realist), the running processes, etc.

Warning : Currently NanoDate extends Date. But there are some interface incompatibilies and as the returned values are not the same (and not always the same type), this can broke Date consumers. I think I will stop to extend Date and implement all the Date methods to keep NanoDate as Date for humans but not as instanceof Date.