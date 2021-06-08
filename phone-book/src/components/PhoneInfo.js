import React, { Component } from 'react'

export default class PhoneInfo extends Component {
    static defaultProps = {
        info : {
            name : '이름',
            phone : '010-1234-5678',
            id: 0
        }
    }

    //update 
    state = {
        //수정버튼을 눌렀을 때 edting 값을 true로 설정
        //이 값이 true일때, 기존에 텍스트 형태로 보여주던 값들을 input 형태로 보여주게 됨.
        editing : false,
        //input의 값은 유동적이겠지요? input 값을 담기 위해서 각 필드를 위한 값도 설정
        name : '',
        phone : ''
    }
    
    handleRemove = () => {
        //삭제버튼이 클릭되면 onRemove에 id 넣어서 호출
        const {info, onRemove} = this.props;
        onRemove(info.id);
    }

    //editing값을 반전시키는 함수
    handleToggleEdit = () => {
        const {editing} = this.state;
        this.setState({
            editing : !editing
        });
    }
    //input에서 onChange 이벤트가 발생 될 때 호출되는 함수
    handleChange = (e) =>{
        const {name, value} = e.target;
        this.setState({
            [name] : value
        });
    }

    componentDidUpdate(prevProps, prevState){
        //여기서는 editing 값이 바뀔 때 처리 할 로직이 적혀있다.
        //수정을 눌렀을 땐, 기존의 값이 Input에 나타나고,
        //수정을 적용할땐, input값들이 부모한테 전달해준다.

        const {info, onUpdate} = this.props;
        if(!prevState.editing && this.state.editing){
            //editing값이 true로 전환될때 info의 값을 state에 넣어준다.
            this.setState({
                name : info.name,
                phone : info.phone
            })
        }
        if(prevState.editing && !this.state.editing){
            //editing값이 false로 전환될때
            onUpdate(info.id, {
                name:this.state.name,
                phone:this.state.phone
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        //수정상태가 아니고, info 값이 같다면 리렌더링 안함
        if(!this.state.editing && !nextState.editing && nextProps.info === this.props.info){
            return false;
        }
        //나머지 경우에 리렌더링함
        return true;
    }

    render() {
        console.log('render PhoneInfo :' + this.props.info.id);
        const style = {
            border : '1px solid #000',
            padding : '8px',
            margin : '8px'
        }
       
        const {editing} = this.state;

        if(editing){//수정모드

            return(
                <div style={style}>
                    <input
                        value={this.state.name}
                        name = "name"
                        placeholder = "이름"
                        onChange = {this.handleChange}
                    />
                    <input
                        value={this.state.phone}
                        name = "phone"
                        placeholder = "전화번호"
                        onChange = {this.handleChange}
                    />
                    <button onClick={this.handleRemove} className="btn-small d-gray">삭제</button>
                    <button onClick={this.handleToggleEdit} className="btn-small blue">적용</button>
                </div>
            )
        }
        //일반모드
        const {name, phone} = this.props.info;
        return (
            <ul style={style}>
                <li><b>{name}</b></li>
                <li>{phone}</li>
                <button onClick={this.handleRemove} className="btn-small l-gray">삭제</button>
                <button onClick={this.handleToggleEdit} className="btn-small blue">수정</button>
            </ul>
        )
    }
}
