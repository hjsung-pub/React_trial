import './App.css';
import React, { Component }  from 'react';
import PhoneForm from './components/PhoneForm';
import PhoneInfoList from './components/PhoneInfoList';

class App extends Component  {
  
  id = 2;
  state = {
      information : [
          {
              id : 0,
              name : 'heejun',
              phone : '010-0000-0000'
          },
          {
              id : 1,
              name : 'heeman',
              phone : '010-1111-1111'
          }
      ],
      keyword : ''
  }

  handleCreate = (data) =>{
    console.log("data ", data);
    const {information} = this.state;
    console.log("information ", information);
    // const {name} = this.state.information[1];
    // console.log("name",name);
    this.setState({
      information : information.concat({
        id : this.id++, 
        ...data
      })
    });
  }

  handleRemove = (id) =>{
    console.log("id : " , id);
    const {information} = this.state;
    this.setState({
      information : information.filter(info => info.id !== id)
    });
  }

  handleUpdate = (id, data) => {
    const {information} = this.state;
    this.setState({
      information : information.map(
        info => id === info.id ? {...info, ...data} : info
      )
    });
  }

  handleChange = (e) =>{
    this.setState({
      keyword : e.target.value
    });
  }

  render(){
    const {information, keyword} = this.state;
    const filteredList = information.filter(
      info => info.name.indexOf(keyword) !== -1
    );

    return (
      <div>
        <PhoneForm onCreate={this.handleCreate} />
        {JSON.stringify(information)}
        <p className="ipt-wrap">
          <input 
            placeholder="검색 할 이름을 입력"
            onChange={this.handleChange}
            value={keyword}
            className="ipt"
          />
        </p>
        <PhoneInfoList 
          // data={this.state.information} 필터링 기능구현 전 코드
          data = {filteredList}
          onRemove={this.handleRemove}
          onUpdate = {this.handleUpdate}
        />
      </div>
    );
  }
}


export default App;
