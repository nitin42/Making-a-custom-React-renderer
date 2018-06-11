# FAQs

#### How `createElement` is useful?

Let's say we have a class component `MyDocument` - 

```jsx
class MyDocument extends React.Component {
  render() {
    return <Text>Hello World!</Text>
  }
}
```

Now this will be transpiled to

```js
_createClass(MyDocument, [
	{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(_src.Text, null, 'Hello World!');
		},
	},
]);
```

Thus we can use the above data to create an instance depending upon the type of an element. For eg - If the type of an element is 'TEXT', we create an instance `new Text(root, props)` and then render the component.

#### How can I create my own components i.e component API?

Well, it totally depends on you to structure the component API. But some things will remain unchanged if you create your own, `appendChild`
and `removeChild`.

#### I need some help on my renderer!?

Sure! Always happy to help you 😄. My Twitter handle is [@NTulswani](https://twitter.com/NTulswani)!
