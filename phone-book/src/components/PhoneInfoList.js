import React, { Component } from 'react';
import PhoneInfo from './PhoneInfo';

export default class PhoneInfoList extends Component {
    static defaultProps= {
        data : [],
        onRemove : () => console.warn("onRemove not defined"),
        onUpdate : () => console.warn("onUpdate not defined"),
    }

    //다음 받아올 data가 현재 data랑 다른 배열일때 true로 설정
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.data !== this.props.data;
    }
    

    render() {
        console.log('render PhoneInfoList');
        const {data, onRemove, onUpdate} = this.props;
        const list = data.map(
            (info, index) => (
            <PhoneInfo 
                key={index} 
                info={info} 
                onRemove={onRemove}
                onUpdate={onUpdate}
            />)
        )

        return (
            <div>
                <h3>Phone Book List</h3>
                {list}
            </div>
        )
    }
}
