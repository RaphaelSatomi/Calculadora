import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';

class Botao extends Component {

    constructor(props) {
        super(props);
        this.state = {};

        let c = 1;
        if(props.c){
            c = parseInt(props.c);
        }

        let bg = '#e0e0e0';
        if(props.bg){
            bg = props.bg;
        }

        this.styles = StyleSheet.create({
            area:{
                flex:c,
                justifyContent:'center',
                alignItems:'center',
                backgroundColor:bg
            },
            text:{
                fontSize:25
            }
        });
    }

    render(){
        return(
            <TouchableOpacity style={this.styles.area} onPress={this.props.onPress}>
                <Text style={this.styles.text}>{this.props.n}</Text>
            </TouchableOpacity>
        );
    }
}

function isNum(s){
    let l = Number.isInteger(parseInt(s));
    if(s == 'C'){
        l = 1;
    }else if(s == '='){
        l = 'eq';
    }
    return l;
}

export default class PrimeiroProjeto extends Component{
    constructor(props){
        super(props);
        this.state = {r:'0', m:'0'};

        this.btn = this.btn.bind(this);
    }

    btn(n){
        let s = this.state;
        let a = toString(s.r).split('');

        if((s.m == 'eq') && (isNum(n) == 'eq')){
            return;
        }else if((isNum(n) !== true) && (s.m == false)){
            return;
        }

        calcNum();
        function calcNum(){
            if(n == 'C') {
                s.r = '0';
            }else if(n == '=') {
                let resp = eval(s.r);
                if(Number.isInteger(parseFloat(resp)) == false){
                    resp = resp.toFixed(2);
                }
                s.r = resp;
            }else {
                if(s.r == '0') {
                    if((n == '*') || (n == '/')){
                        s.r = 0+n;
                    }else{
                        s.r = n;
                    }
                }else {
                    s.r += n;
                }
            }
        }

        s.m = isNum(n);

        this.setState(s);
    }

    render() {
        return(
            <View style={styles.body}>
                <View style={[styles.linha, styles.first]}>
                    <Text style={styles.res}>{this.state.r}</Text>
                </View>
                <View style={styles.linha}>
                    <Botao c="3" n="C" bg="#ccc" onPress={()=>{this.btn("C")}}/>
                    <Botao n="/" bg="#f86624" onPress={()=>{this.btn("/")}}/>
                </View>
                <View style={styles.linha}>
                    <Botao n="7" onPress={()=>{this.btn("7")}}/>
                    <Botao n="8" onPress={()=>{this.btn("8")}}/>
                    <Botao n="9" onPress={()=>{this.btn("9")}}/>
                    <Botao n="*" bg="#f86624" onPress={()=>{this.btn("*")}}/>
                </View>
                <View style={styles.linha}>
                    <Botao n="4" onPress={()=>{this.btn("4")}}/>
                    <Botao n="5" onPress={()=>{this.btn("5")}}/>
                    <Botao n="6" onPress={()=>{this.btn("6")}}/>
                    <Botao n="-" bg="#f86624" onPress={()=>{this.btn("-")}}/>
                </View>
                <View style={styles.linha}>
                    <Botao n="1" onPress={()=>{this.btn("1")}}/>
                    <Botao n="2" onPress={()=>{this.btn("2")}}/>
                    <Botao n="3" onPress={()=>{this.btn("3")}}/>
                    <Botao n="+" bg="#f86624" onPress={()=>{this.btn("+")}}/>
                </View>
                <View style={styles.linha}>
                    <Botao c="2" n="0" onPress={()=>{this.btn("0")}}/>
                    <Botao n="." onPress={()=>{this.btn(".")}}/>
                    <Botao n="=" bg="#f86624" onPress={()=>{this.btn("=")}}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    body:{
        flex:1
    },
    linha:{
        flex:1,
        flexDirection:'row'
    },
    first:{
        flex:2,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#000'
    },
    res:{
        color:'#fff',
        fontSize:70,
        flex:1,
        textAlign:'right',
        paddingRight:10
    }
})