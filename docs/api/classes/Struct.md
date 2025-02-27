# Class: Struct


### Methods

- [getValueSize](Struct.md#getvaluesize)
- [Ref](Struct.md#ref)
- [Get](Struct.md#get)
- [GetSize](Struct.md#getsize)
- [getValueType](Struct.md#getvaluetype)

### Constructors

- [constructor](Struct.md#constructor)

## Methods

### getValueSize

▸ `Static` **getValueSize**(`value`): `number`

get any type value memory size

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `any` | any type value |

#### Returns

`number`

#### Defined in

[src/engine/util/struct/Struct.ts:45](https://github.com/Orillusion/orillusion/blob/main/src/engine/util/struct/Struct.ts#L45)

___

### Ref

▸ `Static` **Ref**<`T`\>(`c`): { `name`: `string` ; `type`: `string`  }[]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Struct`](Struct.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `c` | [`Ctor`](../types/Ctor.md)<`T`\> |

#### Returns

{ `name`: `string` ; `type`: `string`  }[]

#### Defined in

[src/engine/util/struct/Struct.ts:81](https://github.com/Orillusion/orillusion/blob/main/src/engine/util/struct/Struct.ts#L81)

___

### Get

▸ `Static` **Get**<`T`\>(`c`): [`Struct`](Struct.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Struct`](Struct.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `c` | [`Ctor`](../types/Ctor.md)<`T`\> |

#### Returns

[`Struct`](Struct.md)

#### Defined in

[src/engine/util/struct/Struct.ts:87](https://github.com/Orillusion/orillusion/blob/main/src/engine/util/struct/Struct.ts#L87)

___

### GetSize

▸ `Static` **GetSize**<`T`\>(`c`): `number`

get any struct memory size

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Struct`](Struct.md)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `c` | [`Ctor`](../types/Ctor.md)<`T`\> |

#### Returns

`number`

#### Defined in

[src/engine/util/struct/Struct.ts:100](https://github.com/Orillusion/orillusion/blob/main/src/engine/util/struct/Struct.ts#L100)

___

### getValueType

▸ **getValueType**(): { `name`: `string` ; `type`: `string`  }[]

get reflection name

#### Returns

{ `name`: `string` ; `type`: `string`  }[]

#### Defined in

[src/engine/util/struct/Struct.ts:22](https://github.com/Orillusion/orillusion/blob/main/src/engine/util/struct/Struct.ts#L22)

## Constructors

### constructor

• **new Struct**()
