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
