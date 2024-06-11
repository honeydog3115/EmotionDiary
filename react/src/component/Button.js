import "./Button.css";

// 리액트에서 해당 컴포넌트를 사용할 때 함수의 인자로 객체(컴포넌트의 각 속성을 합쳐서)를 던저주기 때문에 구조 분해 할당을 하기위해 {}를 사용해야함.
const Button = ({text, type, onClick}) => {
    const btnType = ["positive", "negative"].includes(type) ? type : "default";
    return (
        <button 
            className={["Button", `Button_${btnType}`].join(" ")} 
            onClick={onClick}
        >
            {text}
        </button>
    )
};

Button.defaultProps = {
    type: "default",
}

export default Button;