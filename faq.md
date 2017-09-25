# FAQs

#### How `createElement` is useful?

Let's say we have a class component `MyDocument` - 

```jsx
class MyDocument extends React.Component {
  render() {
    return (
      <Document>
        <Text>Hello World!</Text>
      </Document>
    )
  }
}
```

Now this will be transpiled to

```js
_createClass(MyDocument, [{
  key: 'render',
  value: function render() {
    return _react2.default.createElement(
      _src.Document,
      null,
      _react2.default.createElement(
        _src.Text,
        null,
        'Hello World!'
      )
    );
  }
}]);
```

Thus we can use the above data to create an instance depending upon the type of an element and finally render the component.

#### What role does the `parse` function plays?

The job of `parse` function is to call the render method on our document property (remember this was in our host config `parentInstance.document = child`) and render
all the children and props.

#### How can I create my own components i.e component API?

Well, it totally depends on you to structure the component API. But some things will remain unchanged if you create your own, `appendChild`
and `removeChild`.

