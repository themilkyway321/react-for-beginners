# 리액트 기초이론 

## 바닐라JS와 리액트의 차이

아래 코드는 리액트를 이해하기 위한 코드. 이렇게 쓰지 않는다. 그러니 암기하지 말고 이해하기! 

- 리액트를 import했기 때문에 createElement function을 가진 리액트 object에 접근 가능
const span 그러나 createElement(“span”) 은 반드시 생성하고자 하는 HTML 태그와 똑같아야함

- React JS - 어플리케이션이 아주 인터랙티브하도록 만들어주는 library. 엔진과 같다.
- React-dom - library 또는 package. 모든 react element들을 HTML body에 둘 수 있도록 해줌.
- ReactDOM.render() - render의 의미는 react element를 가지고 HTML로 만들어 배치한다는 것. 즉, 사용자에게 보여준다는 의미
- ReactDOM.render(span, span이 가야할 위치) -> 그래서 보통 body에 id=“root” 만들어서 span을 root 안에 두라고 함

- React.createElement("span", {span의 property}, “span의 내용”)
-> property는 class name, id도 가능 style도 가능, 이벤트도 가능
-> 참고만 하고 외우지 말기. 이렇게 쓸 일 없음

> 바닐라JS는 HTML -> JS 순서/ 리액트는 JS -> HTML 순서

- JS가 element를 생성하고 React JS가 그것을 HTML로 번역하는 것
- React JS는 업데이트 해야 하는 HTML을 업데이트 할 수 있음. properties를 이용하여 이를 간단하게 구현할 수 있다는 점이다.

```
<!DOCTYPE html>
<html lang="en">
    <body>
        <div id="root"></div>
    </body>
    <!-- How to import React(engine) -->
    <script src="https://unpkg.com/react@17.0.2/umd/react.production.min.js"></script>
    <!-- How to import React-dom(put elements into HTML) -->
    <script src="https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js"></script>
    <script>
        const root = document.getElementById("root");
        const span = React.createElement(
            // HTML Element
            "h3", 
            // properties (eg. class, id, css ...)
            {   
                id: "title",
                onMouseEnter: () => console.log('Mouse entered!'),
            }, 
            // content
            "Hello I am a span"
        );
        const btn = React.createElement(
            "button",
            {   
                // we can implement eventLintener by properties!
                onClick: () => console.log('I am clicked!'),
                style: {
                    backgroundColor: "tomato",
                }
            },
            "Click me"
        );
        const container = React.createElement(
            "div",
            null,
            [span, btn]
        );
        
        // put container into root
        ReactDOM.render(container, root);
    </script>
</html>
```

## JSX 문법

일반적인 JS문법을 좀더 사용하기 편리하게 한 버전을 JSX문법이라고 한다.

그리고 이러한 문법을 그대로 js로 사용하면 당연히 브라우저가 못알아듣기 때문에 다음과 같은 설치가 필요하다.

bable에서 제공하는 JSX신텍스 해독기와

매 script마다 type="text/label"을 넣어줘야하는 번거로움이 있다.


```
<!DOCTYPE html>
<html lang="en">
  <body>
    <div id="root"></div>
  </body>
  <!-- How to import React(engine) -->
  <script src="https://unpkg.com/react@17.0.2/umd/react.production.min.js"></script>
  <!-- How to import React-dom(put elements into HTML) -->
  <script src="https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js"></script>
  <!-- How to make browser read JSX syntax (using babel)-->
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script type="text/babel">
    const root = document.getElementById("root");
    const Title = (
      <h3 id="title" onMouseEnter={() => console.log("mouse enter")}>
        Hello I'm a title
      </h3>
    );
    const btn = (
      <button
        style={{ backgroundColor: "tomato" }}
        onClick={() => console.log("I am clicked!")}
      >
        Click me
      </button>
    );
    const container = React.createElement("div", null, [Title, btn]);

    // put container into root
    ReactDOM.render(container, root);
  </script>
</html>
```
JSX에서 element를 만들 때에는

함수 형식으로 만들어 이를 return 즉 반환하는 형태로 나타낸다.
```
function Title() {
      return (
        <h3 id="title" onMouseEnter={() => console.log("mouse enter")}>
          Hello I'm a title
        </h3>
      );
    };
    // arrow function
    const Button = () => (
      <button
        style={{ backgroundColor: "tomato" }}
        onClick={() => console.log("I am clicked!")}
      >
        Click me
      </button>
    );
    const Container = () => (
      // the first letter of component should be upper case
      // lower case -> HTML tages
      // upper case -> React component
      <div>
        <Title /> 
        <Button />
      </div>
    );
```
위와 같이 일반 함수(function)와 화살표 함수 둘 다 모두 사용할 수 있다. 일반 함수 function을 사용할때는 return을 써줘야함. 

화살표 함수의 경우 별도의 return문은 필요없다.

 

그리고 가장 중요한 것은,

함수명을 선언할 때 반드시 대문자로 시작해야 한다는 것이다.

그렇지 않으면 브라우저는 이를 HTML 태크로 인식한다.

<br /><br />

## state (렌더링, 새로고침)
<br />
다음 코드의 흐름을 살펴보자
이 코드는 HTML을 사용자가 버튼을 누를 때 마다 클릭한 횟수를 사용자에게 보여주게 만든다.


- 최초의 render은 initial render. 이 때의 cnt 값은 0을 갖는다.


- 이상태에선 아무리 버튼을 눌러도 내부에 cnt만 올라갈 뿐, 페이지 상(ui)에서의 변화는 없다.

- 따라서 이를 반영해 주기 위해선 rerendering 즉 다시 render을 하는 과정이 필요하다

- 이것이 function rerender()과, countUp()을 하는 순간 이를 호출하는 것이다. rerender()이 없으면 UI는 변하지 않는다.

- 또한 리액트가 대단한 점은, rerendering 시점에서 Container 전부를 rerendering 하는 것이 아니라, 바뀌는 부분 즉, 이곳에서는 cnt부분만 rerendering 한다는 것이다.
```
<!DOCTYPE html>
<html lang="en">
  <body>
    <div id="root"></div>
  </body>
  
  <!-- How to import React(engine) -->
  <script src="https://unpkg.com/react@17.0.2/umd/react.production.min.js"></script>
  <!-- How to import React-dom(put elements into HTML) -->
  <script src="https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js"></script>
  <!-- How to make browser read JSX syntax (using babel)-->
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  
  <script type="text/babel">
    
    const root = document.getElementById("root");
    
    // cnt
    let cnt = 0;
    
    // countUp() -> counting cnt
    function countUp() {
      cnt = cnt + 1;
      // rerender
      rerender();
    }

    // *** rerender! -> we should call it again to update our UI ***
    function rerender() {
      ReactDOM.render(<Container />, root);
    }

    const Container = () => (
      <div>
        <h3>Total clicks: {cnt}</h3>
        <button onClick={countUp}>Click me</button>
      </div>
    );

    // initial render
    ReactDOM.render(<Container />, root);
  </script>
</html>

```

##  React.useState()

React.useState()를 통해 리렌더링(새로고침)을 간편하게 할 수 있도록 만들수 있다. 

> const data = React.useState();를 console.log 시키면
[undefined, f ] -> undefined와 함수가 적힌 배열이 나타남 <br><br>
undefined는 data이고 f는 data를 바꿀 때 사용하는 함수
React.useState() 함수는 초기값을 설정할 수 있음
즉, undefined는 초기값이고 두 번째 요소인 f는 그 값을 바꾸는 함수


 이제 배열을 꺼내오는 쉬운 방법
```
const name = ["miri", "milkyway"];
const [myName, nickname] = na
myName 의 결과는 miri nickname의 결과는 milkyway로 꺼내올 수 있음. 
```




React.useState() 는 배열을 만들어주는데, 이와 같이 [변수, 함수]를 만들어낸다.

그리고 각각은 [] 에 이름을 주고,

setCounter(함수)의 역할은 앞 변수를 받아, 이를 함수처리해주고 다시 rerendering해준다는 것이다.





```
<!DOCTYPE html>
<html lang="en">
  <body>
    <div id="root"></div>
  </body>
  
  <!-- How to import React(engine) -->
  <script src="https://unpkg.com/react@17.0.2/umd/react.production.min.js"></script>
  <!-- How to import React-dom(put elements into HTML) -->
  <script src="https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js"></script>
  <!-- How to make browser read JSX syntax (using babel)-->
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  
  <script type="text/babel">
    
    const root = document.getElementById("root");

    function App () {
      // unpacking
      const [counter, setCounter] = React.useState(0);
      const onClick = () => {
        // modifier rerenders component itself
        setCounter(counter + 1);
      }
      return (
        <div>
          <h3>Total clicks: {counter}</h3>
          <button onClick={onClick}>Click me</button>
        </div>
      )
    }

    // initial render
    ReactDOM.render(<App />, root);
  </script>
</html>

```

##  React.useState()를 사용하여 state를 설정하는 방법


state를 세팅하는 데는 2가지 방법이 있다.
1. 직접 할당 : setCounter(counter + 1); 현재 counter 값을 가져와서 처리해주는 방법. 

2. 함수를 할당: setCounter((current) => current + 1) 

> 현재 state랑 관련이 없는 값을 새로운 state로 하고싶은 경우에는 1번방법,<br>
현재 state에 조금의 변화를 주어서 새로운 state를 주고 싶은 경우에는 2번방법



```
<!DOCTYPE html>
<html lang="en">
  <body>
    <div id="root"></div>
  </body>
  
  <!-- How to import React(engine) -->
  <script src="https://unpkg.com/react@17.0.2/umd/react.production.min.js"></script>
  <!-- How to import React-dom(put elements into HTML) -->
  <script src="https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js"></script>
  <!-- How to make browser read JSX syntax (using babel)-->
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  
  <script type="text/babel">
    
    const root = document.getElementById("root");

    function App () {
      // unpacking
      const [counter, setCounter] = React.useState(0);
      const onClick = () => {
        // modifier rerenders component itself
        setCounter(counter + 1);
      }
      return (
        <div>
          <h3>Total clicks: {counter}</h3>
          <button onClick={onClick}>Click me</button>
        </div>
      )
    }

    // initial render
    ReactDOM.render(<App />, root);
  </script>
</html>
```


## minutes to hours 혹은 km to miles 컨버터 
 
- select 함수, value 값을 다르게 하여, 선택될 수 있도록 구현. 
그리고 value index 값이 0 이되면 MinutesToHours 함수 실행 
그리고 value index 값이 1 이되면 KmToMiles 함수 실행 

- 큰 그림으로 보면  App 컴포넌트 안에, 자식 컴포넌트 MinutesToHours, KmToMiles 들이 있고 실행이 되고 있음. 하지만,  부모 app컴포넌트와 별개로 영향을 받지않고 자식 컴코넌트들이 실행되고 있음. 

- MinutesToHours
 
 -> user가 정보를 넣는 순간 ( == onChange) onChange함수가 실행되고,

-> 이 함수는 바뀐 순간의 상황 (여기서는 임의로 event라고 정의)의 target.value즉, 사용자가 넣은 숫자를 amount에 넣어 rerendering시킨다.

-> flipped가 false이면 value값으로 amount  값을 보여준다. (기본값이 false 이기 때문에, 처음 보여주는 페이지에는 amount 값을 사용자가 작성하는 대로 보여준다. )

-> flip버튼을 누르면 onFlip 함수 실행. 리셋해주고, false인값을 true로 바꿔줌. 


```
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="root"></div>
</body>
<script src="https://unpkg.com/react@17.0.2/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script type="text/babel">
    const root = document.getElementById("root");
    function MinutesToHours(){ 
      const [amount, setAmount] = React.useState(0);
      const [flipped, setFlipped] = React.useState(false);
      const onChange = (event) => {
        setAmount(event.target.value);
      };
      const reset = () => setAmount(0);
      const  onFlip = () => {
        reset();
        setFlipped((current) => !current);
      };
      return (
      <div>
        <div>
        <label htmlFor="minutes">Minutes</label>
        <input 
          value={flipped ? amount*60 : amount}
          id="minutes" 
          placeholder="Minutes" 
          type="number" 
          onChange={onChange}
          disabled = {flipped}
        />
        </div>
        <div>          
        <label htmlFor="hours">Houres</label>
        <input 
        value= {flipped ? amount : Math.round(amount / 60)}
        id="hours" 
        placeholder ="Hours" 
        type="number" 
        disabled = {!flipped}
        onChange={onChange}
        />
        </div>
        <button onClick={reset}>Reset</button>
        <button onClick={onFlip}>{flipped ? "Turn back" : "Invert"}</button>
      </div>
      );
    };
    function KmToMiles(){
        const [distance, setDitance] =React.useState(0);
        const [invert, setInverted] = React.useState(false);
        const onGet = (event) =>{
          setDitance(event.target.value);
        };
        const onReset = () => setDitance(0);
        const onInvert = () =>{
          onReset();
          setInverted((current) => !current);
        }
      return(
        <div>
        <div>
          <label for="km">killometer: </label>
          <input 
          onChange={onGet}
          value ={invert ? distance * 1.609344 : distance}
          id="km" 
          type="number" 
          placeholder="killometer" 
          disabled={invert}
          />
        </div>
        <div>
          <label for="miles">Miles: </label>
          <input
          onChange={onGet}
          value={invert ?  distance : distance / 1.609344} 
          id="miles"
          type="number" 
          placeholder="miles"
          disabled={!invert}
          />
        </div>
        <button onClick={onReset}>RESET</button>
        <button onClick={onInvert}>Invert</button>

        </div>
      );
    }
    function App(){ 
      const [index, setIndex] =React.useState("first");
      const onSelect = (event) => {
        setIndex(event.target.value);
      }
      return (
      <div>
          <h1>Super Converter</h1>
          <select value={index} onChange={onSelect}>
            <option vlaue="first">Select your units</option>
            <option value="0">Minutes & Hours</option>  
            <option value="1">Km & Miles</option>  
          </select>
          <hr />
          {index === "first" ? "Please select your units" : null}
          {index === "0" ? <MinutesToHours /> : null}
          {index === "1" ? <KmToMiles /> : null}
      </div>
      );
    };
      ReactDOM.render(<App />, root);
  </script>

</html>
```



## Props

버튼의 style property(속성)을 사용
style={{
backgroundColor: "tomato",
}}
{ -> 2개 열고 일반적인 HTML방식으로 써주면 됨

그러나 너무 길어진다
이런 스타일들을 모두 갖는 단 한가지의 컴포넌트로 만들어 재사용 가능

다음 코드를 살펴보자. 
 App 컴포넌트는 Btn 컴포넌트를 두 번 작동시키는데,

이 때에 중요한 점은 인수를 안고 넘어간다는 것이다.

첫 Btn의 경우 banana라는 키에 Save Changes라는 값 그리고 big이라는 키에 true라는 값을 갖고 넘어가며,

이에 따라 버튼에 쓰여질 내용, 그리고 글씨 크기가 정해져 첫 버튼이 print된다.

그리고 두번째 Btn의 경우 banana라는 키에 Continue라는 값 그리고 big 이라는 키에 false라는 값을 갖고 넘어간다.

마찬가지로 이에 따라 버튼에 쓰여질 내용, 그리고 글씨 크기가 정해져 두 번째 버튼이 print된다.
```
<!DOCTYPE html>
<html lang="en">
  <body>
    <div id="root"></div>
  </body>
  
  <!-- How to import React(engine) -->
  <script src="https://unpkg.com/react@17.0.2/umd/react.production.min.js"></script>
  <!-- How to import React-dom(put elements into HTML) -->
  <script src="https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js"></script>
  <!-- How to make browser read JSX syntax (using babel)-->
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  
  <script type="text/babel">
    
    function Btn({ banana, big }) {
      return <button
      style={{backgroundColor:"tomato", color:"white", padding:"10px 20px", border:0, borderRadius:10, fontSize: big ? 18 : 16}}
      >
      {banana}
      </button>
    }
    
    function App () {
      return (
        <div>
          <Btn banana="Save Changes" big={true}/>
          <Btn banana="Continue" big={false}/>
        </div>
      )
    };

    // find id="root" from document(HTML)
    const root = document.getElementById("root");
    
    // initial render
    ReactDOM.render(<App />, root);
  </script>
</html>
```


## React.memo()

리액트에서 useState() 매서드를 사용하면,

변화하는 부분만 HTML에서 쏙쏙 빼와 변화시켜준다는 점을 공부한 적이 있다.

그러나 useState의 modifier 함수가 변화할 때 부모 컴포넌트를 모두 변화시키면

조금은(?) 어쩌면 많이 비효율적인 생산 방식으로 빠질 수도 있다.

 

다음 코드를 살펴보자

<!DOCTYPE html>
<html lang="en">
  <body>
    <div id="root"></div>
  </body>
  
  <!-- How to import React(engine) -->
  <script src="https://unpkg.com/react@17.0.2/umd/react.production.min.js"></script>
  <!-- How to import React-dom(put elements into HTML) -->
  <script src="https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js"></script>
  <!-- How to make browser read JSX syntax (using babel)-->
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  
  <script type="text/babel">
    
    function Btn({ text, changeValue }) {
      console.log(text, 'was rendered')
      return (
      <button
        onClick={changeValue}
        style={{backgroundColor:"tomato", color:"white", padding:"10px 20px", border:0, borderRadius:10,}}
        >
        {text}
      </button>
      )
    }
    
    // This may remember which one has been changed!
    const MemorizedBtn = React.memo(Btn);

    function App () {
      const [value, setValue] = React.useState("Save Changes");
      const changeValue = () => {
        setValue("Revert Changes");
      }
      
      // There is a need to select which components to be changed
      // Use React.memo(Btn) to know where the props has been changed! 
      return (
        <div>
          <MemorizedBtn text={value} changeValue={changeValue}/>
          <MemorizedBtn text="continue"/>
        </div>
      )
    };

    // find id="root" from document(HTML)
    const root = document.getElementById("root");
    
    // initial render
    ReactDOM.render(<App />, root);
  </script>
</html>
이코드는 완성된 코드지만,

만약 App() 컴포넌트에서 MemorizedBtn을 사용하지 않았다면,

첫 번째 버튼의 property만을 변화하고 싶은 시점에서 두 개의 버튼 모두 변화시켜버리는 현상이 일어날 것이다.

이는 한두개의 버튼만을 이용하여 구현하는 사이트라면 상관없겠지만,

수백 수천개의 버튼을 사용하는 사이트(있을라나,,?)를 생각하면 비효율적일 수 있다.

따라서 React는 memo 매서드를 제공하는데 이는 변화한 component만 골라내 새롭게 UI를 업데이트 하는 방식을 채택한다.

다시 말해 첫 번째 버튼만 골라서 업데이트 시켜준다는 것이다.



## Prop Types

지난 시간에는 함수의 인수처럼 React는 Component를 불러올 때 인수를 전달할 수 있다고 배웠다.

이번 시간에는 만약 이러한 인수가 잘못된 형식으로 전달되면? 에 대한 질문이다.

지극히 인간적 관점인 것이, 개발을 하다보면 이런 실수를 자주 하게 되기 때문이다.

애석하게도 리액트는 이를 '잘못된 문법' 이라 우리에게 알려주지 않는다.  즉, 문자가 들어올 자리에 숫자가 들어와도, 틀리다고 알려주지 않음. 


왜냐하면 엄밀히 말해 이는 틀린 문법이 아니라 잘못 말한거기 때문이다.




그러나 친절하게도 리액트는 이에 대한 해법까지 제시해준다.

이것은 우리가 직접 리액트에게 여기에는 이걸 넣어줘~ 라는 식으로 미리 설정을 할 수 있게 하는 것이다.

 

아래 코드를 살펴보자
```
<!DOCTYPE html>
<html lang="en">
  <body>
    <div id="root"></div>
  </body>
  
  <!-- How to import React(engine) -->
  <script src="https://unpkg.com/react@17.0.2/umd/react.development.js"></script>
  <!-- How to import React-dom(put elements into HTML) -->
  <script src="https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js"></script>
  <!-- How to notice React Js which type props must be (preventing error causing by developer) -->
  <script src="https://unpkg.com/prop-types@15.7.2/prop-types.js"></script>
  <!-- How to make browser read JSX syntax (using babel)-->
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <!-- How to use babel (reading JSX syntax properly) -->
  <script type="text/babel">
    
    function Btn({text, fontSize=14}) { // We can set default value (fontSize)
      return (
      <button
        style={{backgroundColor:"tomato", color:"white", padding:"10px 20px", border:0, borderRadius:10, fontSize: fontSize}}
        >
        {text}
      </button>
      )
    };
    
    // Inspect every property's type
    // If the property doesn't have proper datatype, it will send you a error msg.
    Btn.propTypes = {
      text: PropTypes.string,
      fontSize: PropTypes.number,
    };

    function App () {
      return (
        <div>
          <Btn text="Save Changes" fontSize={18}/>
          <Btn text="continue"/>
        </div>
      )
    };

    // find id="root" from document(HTML)
    const root = document.getElementById("root");
    
    // initial render
    ReactDOM.render(<App />, root);
  </script>
</html>
```
이와 같은 필터 기능을 사용하기 위해서는

  <!-- How to notice React Js which type props must be (preventing error causing by developer) -->
  <script src="https://unpkg.com/prop-types@15.7.2/prop-types.js"></script>
propTypes를 설치해줘야 한다.

그리고

    // Inspect every property's type
    // If the property doesn't have proper datatype, it will send you a error msg.
    Btn.propTypes = {
      text: PropTypes.string,
      fontSize: PropTypes.number,
    };
이런식으로 text는 string이여야 하며,

fontSize는 number이여야만 한다는 사실을 미리 리액트에게 교육시켜줘야 한다.

<br /><br />

# == 여기서부터는 React app 설치해서 강의 노트 정리 ==


## import { useState, useEffect } Ⅰ

이전에도 다룬적이 있지만,

useState()를 사용하면 modifier 함수를 불러올 때마다.

부모의 component 즉, 밑의 코드에서 App을 rerendering하게 된다.

그러나 API의 사용 등의 과정이 이 component사이에 껴 있으면,

다른 것을 update하는 과정에서 매번 API를 불러와야하는 불편한(?) 상황이 생길 수 있다.

이를 막기 위해 리액트는 useEffect를 제시한다.

 

다음 코드를 살펴보자
```

import { useState, useEffect } from "react";

function App() {
  
  const [counter, setValue] = useState(0);
  const onClick = () => setValue((prev) => prev + 1);
  
  console.log('I run all the time');

  // useEffect helps us to call a code only one time
  useEffect(() => {
    console.log("CALL THE API...");
  }, []);

  return (
    <div>
      <h1>{counter}</h1>
      <button onClick={onClick}>click me</button>
    </div>
  );
}
```
export default App;
"react"에서 제공하는 useState와 useEffect를 사용할 것인데,

click me 라는 버튼을 클릭할 때 마다 onClick 함수가 실행될 것이다.

이 함수는 setValue라는 useState의 modifier함수인데, 받은 값을 하나 올려주는 역할을 수행함과 동시에,

App을 rerendering시킨다.
이 때에 API를 불러오는 등의 코드가 있으면 위에서 언급한 대로 사이트가 비효율적으로 돌아갈 것이니,

이와 같이 굳이 다시 돌리지 않아도 되는 코드는 useEffect() 속에 넣어두면 된다.




 ## import { useState, useEffect } Ⅱ

다음 코드를 살펴보자
```
import { useState, useEffect } from "react";

function App() {
  
  const [counter, setValue] = useState(0);
  const [keyword, setKeyword] = useState("")
  const onClick = () => setValue((prev) => prev + 1);
  const onChange = (event) => setKeyword(event.target.value);
  console.log('I run all the time');

  // useEffect helps us to call a code only one time
  useEffect(() => {
    console.log("I run only once.");
  }, []);
  
  // This code runs every time the keyword changes
  useEffect(() => {
    // if the keyword is longer than 5 -> working
    if (keyword.length > 5) {
      console.log(`I run when ${keyword} changes`);
    }
  }, [keyword]);
  
  // This code runs every time the counter changes
  useEffect(() => {
    console.log(`I run when ${counter} chagnes`);
  }, [counter])

  // This code runs every thime either the counter or keyword changes
  useEffect(() => {
    console.log('I run when counter or keyword changes');
  },[counter, keyword])

  return (
    <div>
      <input 
      value={keyword} 
      onChange={onChange} 
      type="text" 
      placeholder="Search here...">
      </input>
      <h1>{counter}</h1>
      <button onClick={onClick}>click me</button>
    </div>
  );
}

export default App;

```
useEffect(() => {변했을때 취할 액션}, [변했을때 반응했으면 하는 원소])

를 사용하여, 변했을 때 반응했으면 하는 원소와 변했을 때 취할 액션을 정할 수 있다.



## Cleaup function

많이 사용하는 기술이라고 하지는 않는다.

다만 쓰지 않는 기술은 아니니 간단하게만 보고 넘어가도록 하자.

아래 코드의 useEffect() 두 개는 같은 동작을 실행하는 코드이다.

이전과 달라진점은 useEffect(함수, [dependencies])에서 '함수' 영역에 return문이 생겼다는 것인데,

이것은 원래 '함수'가 destroy 될 때,  일어나는 다른 함수를 지칭한다.
즉, 나 자신이 사라질 때 남기고 갈 함수를 의미한다.

```
import { useState, useEffect } from "react";

function Hello() {

  // useEffect runs function
  // and reapeat it every time the dependencies(inside []) changes
  useEffect(() => {
    console.log("Hi :)");
    return () => {
      console.log("bye :(");
    }
  }, [])
  
  // same meaning another ver.
  // useEffect runs function
  // and reapeat it every time the dependencies(inside []) changes
  // useEffect(function () {
  //   console.log("Hi :)");
  //   return function () {
  //     console.log("bye :(");
  //   }
  // }, []);

  return <h1>Hello</h1>
}

function App() {
  
  // showing -> false(default)
  const [showing, setShowing] = useState(false);
  const onClick = () => setShowing(curr => !curr);
  return (
    <div>
      {showing ? <Hello /> : null}
      <button onClick={onClick}>{showing ? "Hide" : "Show"}</button>
    </div>
  );
}

export default App;
```


## 자바스크립트 map함수

자바스크립트 map 함수에 대해 잠깐 살펴보고 가자. 
array.map() 하게 되면, ()안에 함수가 실행되고, 함수는 array 안에 있는 각각의 원소에 대해 순차적으로 실행해. 

```
const name = ["miri", "haeri"];
name.map((item)=> item.toUpperCase());

```
결과는  ['MIRI', 'HAERI']


## coin tracker 프로젝트 

*event.target[1].value 왜 1이 되는지, 계속 이해가 안됐는데, 
form으로 제출하면, 값을 3개 받아옴. 

0: input
1: select
2: button

그래서 select값을 선택하기 위해 타겟을 1로,,, !!!
```
import { useEffect, useState } from "react";


function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] =useState([]);
  const [dollars, setDollars] =useState(0);
  const [result, setResult] =useState("");
  

  const onChange = (event) =>setDollars(event.target.value);
  useEffect(()=> {
    fetch("https://api.coinpaprika.com/v1/tickers?limit=10").then((response) => response.json()).then((json) => {
      setCoins(json);
      setLoading(false);
  });
  },[]);
  console.log(coins);
  const onCoinChange = (event) => {
    event.preventDefault();
    setResult(dollars*event.target[1].value);
    
  }
  return (
    <form onSubmit={onCoinChange}>      
      <h1>The coins ({loading? null :coins.length})</h1>
      
      $ <input 
      id="d"
      value={dollars}
      onChange={onChange}
      type="number" /> USD{" ---> "} 
      {loading ? <strong>loading...</strong> : <select>
      {coins.map((coin, id)=> (
      <option 
      key={coin.id} 
      value={coin.quotes.USD.price}>
        {coin.name} ({coin.symbol}): {coin.quotes.USD.price}</option>
      ))}
      </select>} <button>Get Coins!</button>
      <br/> <br/>
      

      <h3>{Math.round(result)}</h3>
      
    </form>
  );
}

export default App;
```