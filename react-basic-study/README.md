# 리액트 기초이론 

## 바닐라JS와 리액트의 차이

아래 코드는 리액트를 이해하기 위한 코드. 이렇게 쓰지 않는다. 그러니 암기하지 말고 이해하기! 

- 리액트를 import했기 때문에 createElement function을 가진 리액트 object에 접근 가능
const span 그러나 createElement(“span”) 은 반드시 생성하고자 하는 HTML 태그와 똑같아야함

- React JS - 리액트 js가 element를 생성하고,이벤트를 생성하고, 스타일도 추가하는 등,  어플리케이션이 아주 인터랙티브하도록 만들어주는 library. 엔진과 같다.
- React-dom - library 또는 package. 모든 react element들을 HTML body에 둘 수 있도록 해줌. <br>
=> ReactDOM.render() - render의 의미는 react element를 가지고 HTML로 배치한다는 것. 즉, 사용자에게 보여준다는 의미<br>
=> ReactDOM.render(span, span이 가야할 위치) -> 그래서 보통 body에 id=“root” 만들어서 span을 root 안에 두라고 함

- React.createElement("span", {span의 property}, “span의 내용”)
-> property는 class name, id도 가능 style도 가능, 이벤트도 가능
-> 참고만 하고 외우지 말기. 이렇게 쓸 일 없음

> 바닐라 js와 리액트 js의 차이: 바닐라JS는 HTML -> JS 순서이고 리액트는 JS -> HTML 순서
<br>
- React JS가 element를 생성하고 React JS가 그것을 HTML로 번역하는 것
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

일반적인 JS문법을 좀더 사용하기 편리하게 한 버전을 JSX문법이라고 한다. 보통의 HTML과 비슷해서 많은 개발자들이 jsx문법을 활용하여 리액트를 쓴다. property를 HTML 태그의 속성처럼 적으면 된다. 

그리고 이러한 문법을 그대로 js로 사용하면 당연히 브라우저가 못알아듣기 때문에 다음과 같은 설치가 필요하다.

babel에서 제공하는 JSX신텍스 해독기와  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

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
위의 코드를 이제 조금 더 다듬어보자. 

JSX에서 element를 만들 때에는 함수 형식으로 만들어 이를 return 즉 반환하는 형태로 나타낸다. function 이름(){return};형태로 쓰거나, arrow function으로 const 이름 => () => ();로 쓴다. 
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
- 
=> 변경된 부분만 업데이트된다는게 왜 좋은것일까
일반 자바스크립트를 쓴 브라우저는 노드정보가 바뀔때마다 노드트리를 처음부터 다시 5단계에 걸쳐서 생성. 근데 리액트는 가상돔을 써서 우리 시야에 보이는 부분만 수정해서 보여주고 모든 업뎃이 끝나면 일괄로 합쳐서 실제 돔에 던져준다! 렌더트리 단계를 얼마나 최적화하는가가 중요하다!
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
const [myName, nickname] = name;
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
 App 컴포넌트는 Btn 컴포넌트를 두 번 작동시키는데, 이 때에 중요한 점은 인수를 안고 넘어간다는 것이다. 객체 형태로 전달 

첫 Btn의 경우 banana라는 키에 Save Changes라는 값 그리고 big이라는 키에 true라는 값을 갖고 넘어가며,
이런 형태로 {banana: "Save Changes", big:true} 
이에 따라 버튼에 쓰여질 내용, 그리고 글씨 크기가 정해져 첫 버튼이 출력된다.

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
## props에 function도 넘겨줄 수 있다. 

  const changeValue = () => {
        setValue("Revert Changes");
      }
<Btn banana={value} changeValue={changeValue} /> 이런 식으로 객체를 넘겨 줄 수 있다. 

객체를 받은 Btn 에onClick이벤트 주기 


      
```
<!DOCTYPE html>
<html lang="ko">
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
    
    function Btn({ banana, changeValue}) {
      return <button
      onClick ={changeValue}
      style={{backgroundColor:"tomato", color:"white", padding:"10px 20px", border:0, borderRadius:10,}
    }>
      {banana}
      </button>
    }
    
    function App () {
      const [value, setValue] = React.useState("Save Changes");
      const changeValue = () => setValue("Revert Changes");
      return (
        <div>
          <Btn banana={value} changeValue={changeValue} />
          <Btn banana="Continue" />
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

그러나 리액트의 특징은 useState의 modifier 함수가 변화할 때, 부모 컴포넌트를 모두 변화시킨다는 특징이 있다. 

조금은(?) 어쩌면 많이 비효율적인 생산 방식으로 빠질 수도 있다.

 

다음 코드를 살펴보자
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
```
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
## 초기 set up 
https://nodejs.org/ko/download
1. node js 사용자 버전 설치
2. 윈도우키 + R 누르면 실행창 뜸
3 .열기 칸에 cmd 라고 입력하고 확인
4. 나오는 창에 node -v 입력해서 잘 설치됐는지 확인 후 영상대로 따라하기
5. npx를 실행할 수 있는지 보기 

폴더만들기 

1. npx create-react-app react-for-beginners
2. 이제 visual studio를 열고 npm start 해보기 
3. npm i prop-types 

create-react-app을 사용하면 좋은 점. 
컴포넌트 당 1개의 .js 파일을 가질 수 있어서 모듈화가 가능하다.
- 컴포넌트별 스타일은 이름.module.css 파일을 생성 + import 하여 사용
=> 여기서 스타일은 className이나 id로 import한 스타일 객체의property를 전달하여 적용된다는 것!react 컴파일 과정 중 random class나 id가 생성되기 때문에 class나 id 이름을 중복해서 사용할 수 있다. 예를 들어 아래 App.module.css title이라는 이름의 클래스를 사용하더라도, react 컴파닝 과정 중에 클래스가 새로 생성되므로, title이라는 클래스 이름을 Button.module.css 에서도 사용할 수 있다. 
App.js
```
import Button from "./Button";
import styles from "./App.module.css";

function App() {
  return (
    <div>
      <h1>Welcome back!!!</h1>
      <h1 className={styles.title}>Welcome back!!!</h1>
      <Button text={"Continue"} />
    </div>
  );
}
```

App.module.css
```
.title {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 18px;
}
```

## import { useState, useEffect } Ⅰ


 const [counter, setValue] = useState(0); create react app을 사용하기 때문에 React.useState()대신 useState()를 사용할 수 있다. 

이전에도 다룬적이 있지만,

useState()를 사용하면 modifier 함수를 불러올 때마다.

부모의 component 즉, 밑의 코드에서 App을 rerendering하게 된다.

그러나 API의 사용 등의 과정이 이 component사이에 껴 있으면,

다른 것을 update하는 과정에서 매번 API를 불러와야하는 불편한(?) 상황이 생길 수 있다.

이를 막기 위해 리액트는 useEffect를 제시한다.

useEffect
- 두 개의 argument를 가지는 함수
- 첫 번째 argument는 우리가 딱 한번만 실행하고 싶은 코드
- 두 번째는 [] 배열을 넣어줌
-> useEffect가 컴포넌트의 첫 번째 렌더 시점에만 호출하고
그리고 useState상태를 변화시켜도  호출되지 않음
즉, 한번만 렌더링 됨
단순화 하여 useEffect(() => {
console.log("CALL THE API")
},[]); 써도 됨
 

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
useEffect(() => {변했을때 취할 액션}, [변했을때 반응했으면 하는 원소]) 를 사용하여, 변했을 때 반응했으면 하는 원소와 변했을 때 취할 액션을 정할 수 있다. 

  useEffect(() => {
      console.log(`I run when ${keyword} changes`);
  }, [keyword]);
  즉, 처음 렌더링할때 실행되고, 그 다음은 keyword가 변했을때만 cosole.log실행 


  useEffect(() => {
    // if the keyword is longer than 5 -> working
    if (keyword.length > 5) {
      console.log(`I run when ${keyword} changes`);
    }
  }, [keyword]);
  
  얘는 처음에 랜더링이 안된다,,왜? 조건이 있어!! 키워드 글자가 5개 초과하면 실행하라는 조건!

## Cleaup function

많이 사용하는 기술이라고 하지는 않는다.

다만 쓰지 않는 기술은 아니니 간단하게만 보고 넘어가도록 하자.

아래 코드의 useEffect() 두 개는 같은 동작을 실행하는 코드이다.

이전과 달라진점은 useEffect(함수, [dependencies])에서 '함수' 영역에 return문이 생겼다는 것인데,

이것은 원래 '함수'가 destroy 될 때,  일어나는 다른 함수를 지칭한다.
즉, 나 자신이 사라질 때 남기고 갈 함수를 의미한다.

즉 아래 코드에서  <Hello />가 showing 될때 cosole에 hi출력, hide되어 null일때 console에 bye 출력 

```
import { useState, useEffect } from "react";

function Hello() {

  
  useEffect(() => {
    console.log("Hi");
    return () => {
      console.log("bye");
    }
  }, [])
  
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

## To Do List 
리액트에서 수정하는 함수를 사용할때 2가지 방식이 있어. 
=>
1) 값을 저장하거나, 
const [toDo, setTodo] =useState();
setTodo("");

2)
함수를 보내는 방식: 함수를 보낼때, 인자는 현재의 state를 첫번째 인자로 보낸다. 
const [toDos, setToDos] = useState([]);
setToDos((currentArray) => [toDo, ...currentArray]);


...currentArray는 배열에 추가하는 방식
const pizza = [1,2,3,4];
const newPizza = [5, ...pizza]; 의 결과는 [5,1,2,3,4]


3) 자바스크립트 map함수

a배열.map(함수실행): a배열에 있는 각 원소들마다 함수를 실행해서, 새로운 배열을 만들어 낸다. 
const pizza =[1,2,3,4];

pizza.map((item)=>item+1)의 실행 결과 [2, 3, 4, 5]
```
import { useState, useEffect } from "react";

function App() {
  const [toDo, setTodo] =useState();
  const onChange = (event) =>{
    setTodo(event.target.value);
  };
  const [toDos, setToDos] = useState([]);
  const onSubmit = (event) => {
    event.preventDefault();
    if( toDo === ""){
      return;
    }
    
    setToDos((currentArray) => [toDo, ...currentArray]);
    setTodo("");
    
  }
  console.log(toDos);
  return (
    <div>
      <h1>My To Dos {toDos.length}</h1>
      <form onSubmit={onSubmit}>
        <input
        onChange={onChange}
        value={toDo}
        type="text"
        placeholder="Write your name.."
        />
        <button>Click</button>
      </form>
      <hr />
      <ul>{toDos.map((item, index)=><li key={index}>{item}</li>)}</ul>
    </div>
  );
}

export default App;

```
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

## Router
Router란 http 주소 내에서 보여줄 페이지를 골라주는

길잡이 역할을 한다.
```
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import Home from "./routes/Home";
import Movie from "./routes/Detail"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/movie" element={<Movie />}></Route>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </Router>
  )
}

export default App;
```
윗 코드에서 react-router-dom으로부터 BrowserRouter, Routes, Route를 빌려 와

주소 뒤에 /movie가 붙었을 때는 Movie component를,

아무 것도 붙어 있지 않을 때는 Home component를 불러 옴을 알 수 있다.


## ReactJS Params, Link

Params는 사이트 주소 상의 :id 부분을 통해

개발자들에게 지금 다루는 API 정보를 쉽게 접근할 수 있는 기능을 수행해준다.

다음은 내가 만든 영화 소개 페이지이다.
```
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// useParams() -> returns id(the last one in path)
import { Link } from 'react-router-dom';

function Detail() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [currMovie, setCurrMovie] = useState("");
    
    const getMovie = async () => {
        const json = await (
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        ).json();
        // Give currMovie an inforamtion in form of json
        setCurrMovie(json);
        // set Loading status false
        setLoading(false);
    };

    // Get API by using getMovie function
    useEffect(() => {
        getMovie();
    }, [])
    
    return (
        <div>
            {loading ? <h1>Loading,,,</h1> : // if it is still on loading,, 
                // if loading finished,,,
                <div>
                    <img src={currMovie.data.movie.medium_cover_image}></img>
                    <h3> Title : {currMovie.data.movie.title}</h3>
                    <h3> Genres : {currMovie.data.movie.genres[0]}</h3>
                    <h3> Year : {currMovie.data.movie.year}</h3>
                    <h3> Languages : {currMovie.data.movie.language}</h3>
                    <h3><Link to='/' style={{textDecoration:"none", color:"black"}}>Go back</Link></h3>
                </div>
            }
        </div>
    )
}
export default Detail;
```
모든 routing은 이 파일 밖의 App.js가 수행한다 (*참고)

 

return문을 보면, 최초의 loading 상태에 따라 UI에 표기되는 정보가 달라진다.

loading은 useState를 통해 정의되어 있는데, 그 default값은 true이다.

그러므로 처음에는 UI에 h1태그 안에 담긴 Loading,,, 밖에 나타나지 않는다.

그러나 useEffect()를 통해 getMovie() 함수가 실행되면,

이는 json을 이용해(여긴 잘 모름) API를 통해 영화에 대한 정보를 가져온다.

이 때에 중요한 역할을 하는 것이 Params인데, {id}는 Params를 통해 고유한 값을 전달받는다.

그 값을 이용, 주소를 통한 필터링을 통해 json을 통해 어떻게 어떻게 가져오는 것이다. 

중요한 것은 이렇게 얻은 json 값을 setCurrMovie 함수를 통해 currMovie에 할당하는데,

이는 영화에 대한 정보를 담은 정보 꾸러미(?)에 해당한다.

이와같은 정보 꾸러미를 currMovie에 할당한 후, loading은 false 상태가 되고, UI는 한번 더 불러와진다.

 

그러면 loading은 false이니, 아까의 Loading,,,은 더 이상 나타나지 않고,

제목, 장르, 연도, 언어 등 내가 설정한 정보가 UI에 나타난다.

 

* 추가적으로 Link는 router의 방향을 쉽게 틀어주는 도구인데,

클릭과 동시에 내가 원하는 라우터 (위의 코드에서는 '/')로 사용자를 보내준다. *



## React 스타일

- 글로벌 스타일: 
index.js에 파일에
```
import './style.css';
```
이렇게 적용해주면, style.css에 있는 모든 내용이 적용. 

- 직접주기: 아래 코드 처럼 직접 주기
```
<button style={{backgroundColor:'black'}}>{text}</button>
```
- CSS 모듈: 
Movie.js파일에 
적용할 파일이름.module.css 파일을 만들고 import 후에,  
className들로 해주고 module.css에서는 .mainImg{} 이런식으로 스타일을 주면된다. 
```
import styles from "./Movie.module.css";
 <img className={styles.mainImg} />
```


## 데이터를 가져오는 방식 fetch
1) 
```
 useEffect(()=> {
    fetch(`https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year`).then((response) => response.json()).then((json) => {
      setMovies(json.data.movies);
      setLoading(false)
    });
  },[]);
```
2) 1)이랑 같은 표현 
```
 const getMovies = async() => {
    const json = await(await fetch(`https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year`)).json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  useEffect(()=>{
    getMovies();
  },[])

```
## Router Link 
```
<h2><a href="/movie">{title}</a></h2> 이렇게 하게되면, 이동할 때 전체페이지가 새로고침된다. 
```
```
<h2><Link to="/movie">{title}</Link></h2> Router의 Link 를 사용하면 새로고침되지 않음 
```

## useParams

App.js에서 movie뒤에 id 인자 넘겨줌. 
```
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/movie/:id">
          <Detail />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
    );
}

export default App;
```


```
import { useParams } from "react-router-dom";
function Detail(){
  const x = useParams();
  console.log(x);
  return <h1>Detail</h1>;
}

export default Detail;
```
console.log(x)의 결과는 {id: '51899'}이것을 출력. 


따라서 
```
import { useParams } from "react-router-dom";
function Detail(){
  const {id} = useParams();
  console.log(id);
  return <h1>Detail</h1>;
}

export default Detail;
```
console.log(id);의 결과값은 51899을 출력 

## Publishing

- npm i gh-pages
(npm run build)  생략?

- package.json에 deploy, predeploy부분 추가 
```
 "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "deploy": "gh-pages -d build",
    "predeploy": "npm run build"
  },
 ```
- package.json에 homepage 추가 
```
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
"homepage": "https://nomadcoders.github.io/react-for-beginners"
```

- npm run deploy


