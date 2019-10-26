import React, { Component } from 'react';
import { TwitterPicker } from 'react-color';
import './Tarea.css';


class Tarea extends Component {

    state = {
        displayColorPicker: false,
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };

    onBtnClickColorPiker = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    }

    onColorChanged = (newColor) => {
        this.props.onChangeColor(this.props.data, newColor.hex)
    }


    render() {

        const popover = {
            position: 'absolute',
            left : '200px',
            zIndex: '2',
        }
        const cover = {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
        }

        return (
            <div style={{ position: 'relative' }}>
                <div className={`Tarea ${this.props.data.completed ? 'completed' : ''}`} style={{ borderRightColor: this.props.data.color }}>
                    <p className="text">{this.props.data.text}</p>
                    <button className="buttonsTasks" onClick={() => this.props.onDelete(this.props.data)}>Eliminar</button>
                    <button className="buttonsTasks" onClick={() => this.props.onComplete(this.props.data)}>Completar</button>

                    <button className="buttonsTasks" onClick={this.onBtnClickColorPiker}>Pick Color</button>
                </div>
                
                {this.state.displayColorPicker ?
                    <div style={popover}>
                        <div style={cover} onClick={this.handleClose} />
                        <TwitterPicker onChange={this.onColorChanged} />
                    </div> : null}
            </div>
        );
    }
}

export default Tarea;