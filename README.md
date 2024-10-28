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
```

Warning : Currently NanoDate extends Date. But there are some interface incompatibilies and as the returned values are not the same (and not always the same type), this can broke Date consumers. I think I will stop to extend Date and implement all the Date methods to keep NanoDate as Date for humans but not as instanceof Date.