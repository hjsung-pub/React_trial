import React, { Component } from 'react';

class PhoneForm extends Component {
    state = {
        name : '',
        phone : '',
        isBlank : false
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            isBlank : e.target.value !== ''
        });
    }
    handleSubmit = (e) => {
        e.preventDefault(); //페이지 리로딩 방지
        if(!this.state.isBlank){return;}
        this.props.onCreate(this.state); // 상태값을 onCreate 를 통하여 부모에게 전달
        this.setState({ // 상태 초기화
            name : '',
            phone : '',
            isBlank : false
        })
    }
  
    render(){
        return(
            <div>
                <h3>Phone Book</h3>
                <form onSubmit={this.handleSubmit} className="form-box">
                    <input 
                        name="name"
                        placeholder="이름"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                    <input 
                        type ="number"
                        name="phone"
                        placeholder="전화번호"
                        value={this.state.phone}
                        onChange={this.handleChange}
                    />
                    <span className="form-txt">{this.state.isBlank ? '작성중' : '작성해주세요'}</span>
                    <div className="form-info">{this.state.name} {this.state.phone}</div>
                    <button type="submit" className="btn-txt blue">등록</button>
                </form>
            </div>
        );
    }
}


export default PhoneForm;
