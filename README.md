[![Version](https://badgen.net/npm/v/@sadbox/service-locator)](https://www.npmjs.com/package/@sadbox/service-locator) [![License](https://badgen.net/npm/license/@sadbox/service-locator)](https://www.npmjs.com/package/@sadbox/service-locator) [![Dependencies](https://badgen.net/david/dep/strayiker/service-locator)](https://www.npmjs.com/package/@sadbox/service-locator)

# Service Locator

An implementation of Service Locator pattern.

## Install

`yarn add @sadbox/service-locator`

or

`npm install -S @sadbox/service-locator`

## Usage

```javascript
import ServiceLocator from '@sadbox/service-locator';
import Service1 from './Service1';
import Service2 from './Service2';

const services = new ServiceLocator();

services.register({
  name: 'Service1',
  constructor: Service1,
  args: ['option'],
});

services.register({
  name: 'Service2',
  constructor: Service2,
  deps: ['Service1'],
  singleton: false,
});

const {
  Service1: service1, // instance of Service1
  Service2: service2, // instance of Service2
} = services;
```

## API

```javascript
ServiceLocator.register({
  name,
  constructor,
  instance,
  args,
  deps,
  singleton,
});
```

Registers service and allow to take it instance later.

`name (string)` - Unique name of the service.

`constructor ({ new (): any })` - The service "newable" class.

`instance (any)` - Instance of the service. Whenever you will ask to instance, it will be returned.

`args (Array<any>)` - Arguments to pass to the constructor when creating an instance.

`deps (Array<string>)` - List of service names to resolve and pass to the constructor when creating an instance.

`singleton (boolean)` - If `true`, only first resolve will create instanse of the service. Subsequent resolves will return the same instance. If `false` new instanse will be created on each resolve. Default is `false`.

---

```javascript
ServiceLocator.resolve(name);
```

or

```javascript
ServiceLocator[name];
```

Returns an instance of the service.

`name (string)` - Name of the service.

---

```javascript
ServiceLocator.evict(name: string)
```

Removes the instance of the service and all instances of the services that depends on it.

`name (string)` - Name of the service.
