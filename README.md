The bundled OpenType.js in Satori has been changed as follows:

In `parseFvarAxis`, change:
```
    axis.name = names[p.parseUShort()] || {};
```
to
```
    axis.name = (names && names[p.parseUShort()]) || {};
```

In `parseFvarInstance`, change:
```
    inst.name = names[p.parseUShort()] || {};
```
to
```
    inst.name = (names && names[p.parseUShort()]) || {};
```

Without this we get the error:
```
"cannot convert 'null' or 'undefined' to object"
```

When the above lines are executed for some fonts.