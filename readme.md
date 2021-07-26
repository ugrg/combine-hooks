# combine hooks
将多个`useHooks`合并成一个`hooks`，以便于`unstated-next`使用一次`createContainer`来创建全局的`store`。

## Installation
```shell script
npm install combine-hooks
```
or
```shell script
yarn add combine-hooks
```

## 为什么，Why
在使用`unstated-next`构建全局状态时，通常我们会分成好几类状态来分别`createContainer`。在装载到`React`树的时候，会出现多个`Provider`嵌套，形式上看起来非常的不舒服。

而我们在使用`redux`的时候会使用一个`combineReducers`函数将所有的`reducer`组合成一个大集合，这样我们在绑定`Provider`时，只需要绑定一层即可，所以就有了现在这个函数。

通过这个函数，我们可以将多个用于`createContainer`的`hook`函数组合起来，形成一个大的`hooks`集合，这样我们就可以使用一个`Provider`来完成数据绑定了。

## 样例，Example
```ts 
// store
import { useState } from 'react'
import { createContainer } from 'unstated-next';
import combineHooks from 'combine-hooks';

/**
 * 状态A
 */
function A (initialState: number) {
  const [a, setA] = useState<number>(initialState);
  return {a, setA}; 
}

/**
 * 状态B
 */
function B () {
  const [b, setB] = useState<string>('');
  return {b, setB};
}

const Store = createContainer(combineHooks({ A, B }));
export default Store;
```
```tsx
// App
import React from 'react';
import Store from './store';

function App () {
  const { A: { a, setA }, B: { b, setB } } = Store.useContainer();
  // OR
  const A = Store.useContainer().A
  return (
    <div className="App">
      {a}{b}
      {A.a}
    </div>
  );
}

export default App;
```
```tsx
// index
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Store from './store';

ReactDOM.render(
  <React.StrictMode>
    <Store.Provider initialState={{ useHookA: 1 }}>
      <App/>
    </Store.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
```
