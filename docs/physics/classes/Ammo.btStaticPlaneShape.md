# Class: btStaticPlaneShape

[Ammo](../modules/Ammo.md).btStaticPlaneShape

## Hierarchy

- [`btConcaveShape`](Ammo.btConcaveShape.md)

  ↳ **`btStaticPlaneShape`**


### Methods

- [setLocalScaling](Ammo.btStaticPlaneShape.md#setlocalscaling)
- [getLocalScaling](Ammo.btStaticPlaneShape.md#getlocalscaling)
- [calculateLocalInertia](Ammo.btStaticPlaneShape.md#calculatelocalinertia)
- [setMargin](Ammo.btStaticPlaneShape.md#setmargin)
- [getMargin](Ammo.btStaticPlaneShape.md#getmargin)

### Constructors

- [constructor](Ammo.btStaticPlaneShape.md#constructor)

## Methods

### setLocalScaling

▸ **setLocalScaling**(`scaling`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `scaling` | [`btVector3`](Ammo.btVector3.md) |

#### Returns

`void`

#### Inherited from

[btConcaveShape](Ammo.btConcaveShape.md).[setLocalScaling](Ammo.btConcaveShape.md#setlocalscaling)

#### Defined in

[libs/ammo/ammo.d.ts:267](https://github.com/Orillusion/orillusion/blob/main/src/libs/ammo/ammo.d.ts#L267)

___

### getLocalScaling

▸ **getLocalScaling**(): [`btVector3`](Ammo.btVector3.md)

#### Returns

[`btVector3`](Ammo.btVector3.md)

#### Inherited from

[btConcaveShape](Ammo.btConcaveShape.md).[getLocalScaling](Ammo.btConcaveShape.md#getlocalscaling)

#### Defined in

[libs/ammo/ammo.d.ts:268](https://github.com/Orillusion/orillusion/blob/main/src/libs/ammo/ammo.d.ts#L268)

___

### calculateLocalInertia

▸ **calculateLocalInertia**(`mass`, `inertia`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `mass` | `number` |
| `inertia` | [`btVector3`](Ammo.btVector3.md) |

#### Returns

`void`

#### Inherited from

[btConcaveShape](Ammo.btConcaveShape.md).[calculateLocalInertia](Ammo.btConcaveShape.md#calculatelocalinertia)

#### Defined in

[libs/ammo/ammo.d.ts:269](https://github.com/Orillusion/orillusion/blob/main/src/libs/ammo/ammo.d.ts#L269)

___

### setMargin

▸ **setMargin**(`margin`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `margin` | `number` |

#### Returns

`void`

#### Inherited from

[btConcaveShape](Ammo.btConcaveShape.md).[setMargin](Ammo.btConcaveShape.md#setmargin)

#### Defined in

[libs/ammo/ammo.d.ts:270](https://github.com/Orillusion/orillusion/blob/main/src/libs/ammo/ammo.d.ts#L270)

___

### getMargin

▸ **getMargin**(): `number`

#### Returns

`number`

#### Inherited from

[btConcaveShape](Ammo.btConcaveShape.md).[getMargin](Ammo.btConcaveShape.md#getmargin)

#### Defined in

[libs/ammo/ammo.d.ts:271](https://github.com/Orillusion/orillusion/blob/main/src/libs/ammo/ammo.d.ts#L271)

## Constructors

### constructor

• **new btStaticPlaneShape**(`planeNormal`, `planeConstant`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `planeNormal` | [`btVector3`](Ammo.btVector3.md) |
| `planeConstant` | `number` |

#### Overrides

[btConcaveShape](Ammo.btConcaveShape.md).[constructor](Ammo.btConcaveShape.md#constructor)

#### Defined in

[libs/ammo/ammo.d.ts:407](https://github.com/Orillusion/orillusion/blob/main/src/libs/ammo/ammo.d.ts#L407)
