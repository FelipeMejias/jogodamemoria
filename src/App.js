import logo from './logo.svg';
import './App.css';
import styled from 'styled-components'
import { useState } from 'react';
import { useEffect } from 'react';
import fusca from './imgs/fusca.jpg'
import audi from './imgs/audi.png'
import bmw from './imgs/bmw.jpg'
import chevrolet from './imgs/chevrolet.jpg'
import citroen from './imgs/citroen.jpg'
import honda from './imgs/honda.jpg'
import hyundai from './imgs/hyundai.jpg'
import mercedes from './imgs/mercedes.jpg'
import nissan from './imgs/nissan.jpg'
import peugeot from './imgs/peugeot.jpg'
import renault from './imgs/renault.jpg'
import toyota from './imgs/toyota.jpg'
import volkswagen from './imgs/volwswagen.jpg'
import ferrari from './imgs/ferrari.jpg'
import fiat from './imgs/fiat.jpg'
import ford from './imgs/ford.png'
import kia from './imgs/kia.png'
import lamborghini from './imgs/lamborghini.jpg'
import landrover from './imgs/landrover.jpg'
import maserati from './imgs/maserati.png'
import mitsubishi from './imgs/mitsubishi.png'
import porsche from './imgs/porsche.jpg'
import ram from './imgs/ram.png'
import suzuki from './imgs/suzuki.png'
import volvo from './imgs/volvo.jpg'
import aguia from './animais/aguia.jpg'
import elefante from './animais/elefante.jpg'
import formiga from './animais/formiga.png'
import girafa from './animais/girafa.png'
import golfinho from './animais/golfinho.jpg'
import leao from './animais/leao.jpg'
import orca from './animais/orca.png'
import orni from './animais/orni.jpg'
import pinguim from './animais/pinguim.jpg'
import rino from './animais/rino.png'
import sapo from './animais/sapo.jpg'
import tigre from './animais/tigre.jpg'
import canguru from './animais/canguru.png'
import cobra from './animais/cobra.jpg'
import estrela from './animais/estrela.jpg'
import foca from './animais/foca.jpg'
import marin from './animais/marin.jpg'
import pato from './animais/pato.jpg'
import tartaruga from './animais/tartaruga.jpg'
import dino from './animais/dino.png'
import capaAnimais from './imgs/capa.jpg'
const lista24falses=[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,]
function App() {
  const animais=[aguia,elefante,formiga,girafa,golfinho,leao,orca,orni,pinguim,rino,sapo,tigre,canguru,cobra,estrela,foca,marin,
        pato,tartaruga,dino
  ]
  const marcas=[audi,bmw,chevrolet,citroen,
    renault,toyota,volkswagen,ferrari,
    honda,hyundai,fiat,ford,kia,lamborghini,landrover,mercedes,nissan,peugeot,
    maserati,mitsubishi,
    porsche,ram,suzuki,volvo]
    const [imagens,setImagens]=useState(false)
  const [emb,setEmb]=useState(false)
  function shuffle(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  }
  const [tema,setTema]=useState(1)
  const capa=tema==1?fusca:capaAnimais
  const [pares,setPares]=useState(false)
  const [erros,setErros]=useState(0)
  const [tipo,setTipo]=useState(false)
  const [jogo,setJogo]=useState([])
  const [placar,setPlacar]=useState([0,0])
  const [vez,setVez]=useState(0)
  const [show,setShow]=useState(lista24falses)
  const [achados,setAchados]=useState(lista24falses)
  function encerrarJogo(pontos0,pontos1){
    let textoFim=tipo==1?`
            Boaaa! 
            Você completou ${pares} pares errando apenas ${erros}
            `:`
            ${pontos0>pontos1?'Vermelho':pontos1>pontos0?'Azul':'Empatou!'} ${pontos0==pontos1?'':'ganhou!'} 
            Placar: ${pontos0>pontos1?pontos0:pontos1} a ${pontos0<pontos1?pontos0:pontos1}
            `
            
            if(tipo==1){
              const recorde=JSON.parse(localStorage.getItem(`r${pares}`))||false
              if(recorde){
                if(erros<recorde){
                  localStorage.setItem(`r${pares}`, JSON.stringify(erros))
                  textoFim+='. Um novo recorde!'
                }
              }else{
                textoFim+='. Um novo recorde!'
                localStorage.setItem(`r${pares}`, JSON.stringify(erros))
              }
            
          }
    setTipo(textoFim)
  }
  useEffect(()=>{
  },[])
  useEffect(()=>{
    setImagens(shuffle(tema==1?marcas:animais))
    const array=[]
    const arrayFalses=[]
    for(let k=0;k<pares;k++){
      array.push(k);array.push(k);
      arrayFalses.push(false);arrayFalses.push(false);
    }
    const novoEmb=shuffle(array)
    console.log(novoEmb)
    setEmb([...novoEmb])
    setShow([...arrayFalses])
    setAchados([...arrayFalses])
  },[pares,tema])
  useEffect(()=>{
    console.log(emb,show,achados)
    const array=[]
    for(let k=0;k<pares;k++){
      array.push(false);array.push(false);
    }
    const quemJogou=vez
    if(jogo.length==0)setShow(array)
    if(jogo.length==1){
      const ar=[]
      for(let k=0;k<pares*2;k++){
        if(k==jogo[0]){ar.push(true)}else{ar.push(false)}
      }
      setShow(ar)
    }
    if(jogo.length==2){
      const ar=[]
      for(let k=0;k<pares*2;k++){
        if(k==jogo[0]||k==jogo[1]){ar.push(true)}else{ar.push(false)}
      }
      setShow(ar)
      setVez(null)

      setTimeout(()=>{
        if(emb[jogo[0]]==emb[jogo[1]]){
          const ar=[]
          for(let k=0;k<pares*2;k++){
            if(k==jogo[0]||k==jogo[1]){ar.push(true)}else{ar.push(achados[k])}
          }
          let pontos0=placar[0]
          let pontos1=placar[1]
          if(vez==0)pontos0++
          if(vez==1)pontos1++
          setPlacar([pontos0,pontos1])
          setJogo([])
          setAchados(ar)
          setVez(quemJogou)
          let acabou=true
          for(let item of ar){
            if(!item)acabou=false
          }
          if(acabou)encerrarJogo(pontos0,pontos1)
            
        }else{
          setErros(erros+1)
          setJogo([])
          setVez(quemJogou==0?1:0)
        }
      },1700)
    }
  },[jogo])
  const listaPossiveis=[12,20,24]
  
  const r12=JSON.parse(localStorage.getItem('r12'))||false
  const r20=JSON.parse(localStorage.getItem('r20'))||false
  const r24=JSON.parse(localStorage.getItem('r24'))||false
  const listaR=[r12,r20,r24]
  return (
    tipo==false?
    <Tudo>
          <Btn cor={true} primeiro={true} onClick={()=>setTipo(1)}>
            solo
          </Btn>
          <Btn cor={true}   onClick={()=>setTipo(2)}>
            confronto
          </Btn>
          <h1>Tema:</h1>
          <Btn   onClick={()=>setTema(2)}>
            {tema==1?<Sel><ion-icon name="checkmark-circle-outline"></ion-icon></Sel>:<></>}
            carros
          </Btn>
          <Btn  onClick={()=>setTema(2)}>
          {tema==2?<Sel><ion-icon name="checkmark-circle-outline"></ion-icon></Sel>:<></>}
            animais
          </Btn>
          
    </Tudo>:
    tipo!=1&&tipo!=2?
    <Tudo>
      <h6>{tipo}</h6>
    </Tudo>:(tipo==1||tipo==2)&&!pares?
    <Tudo>
    {listaPossiveis.map((num,index)=><Btn onClick={()=>{setPares(num);}}>
    {num} pares
    {listaR[index]?<Recorde><p>RECORDE</p> <p>{listaR[index]} erros</p></Recorde>:<></>}
    </Btn>)}
  </Tudo>
    :
    <Tudo>
      {
        tipo==1?<Placar>
          <h3>erros: {erros}</h3>
          {vez===null?<Go cor={'transparent'}></Go>:<Go cor={'green'}>go!</Go>}
        </Placar>:<Placar>
        <h1>{placar[0]}</h1>
        
        {vez===null?<Go cor={'transparent'}></Go>:vez==0?<Go cor={'#f20707'}>go!</Go>:<Go cor={'#2320d6'}>go!</Go>}
        <h2>{placar[1]}</h2>
        </Placar>
      }
      {!emb||!tipo?<></>:<Deck  width={pares==24?'calc(66vh - 45px)':'calc(59vh - 45px)'} height={pares==12?'calc(100vh - 130px)':pares==20?'calc(100vh - 90px)':'calc(100vh - 130px)'}>
        {emb.map((num,index)=>{
          const width=pares==12?23:pares==20?18.4:15.3
          const height=pares==12?15:11.5
          return(
            achados[index]?
            <Kard width={width} height={height} ></Kard>
            :<Card width={width} height={height} onClick={()=>{if(jogo.length==1&&jogo[0]==index){}else{setJogo([...jogo,index])}}}>
            {!show[index]?<section><img src={capa}/></section>:
            <article><img src={imagens[num]}/></article>}
          </Card>
          )})}
        </Deck>}
    </Tudo>
  );
}

export default App;
const Sel=styled.div`
position:absolute;
display:flex;align-items:center;justify-content:center;
font-size:40px;
height:50px;width:50px;
left:10px;
`
const Recorde=styled.div`
background-color:blue;width:96px;height:50px;
font-size:16px;display:flex;flex-direction:column;
justify-content:space-evenly;
p{margin:0px;}color:white;border-radius:10px;
`
const Go=styled.div`
display:flex;justify-content:center;align-items:center;
color:white;box-sizing:border-box;
background-color:${props=>props.cor};
width:90px;height:50px;border-radius:25px;
margin:15px 15px 0 20px;padding-bottom:8px;
font-weight:600;font-size:35px;
`
const Placar=styled.div`
width:100%;background-color:;
height:80px;display:flex;justify-content:space-evenly;
font-size:20px;
h1{width:20px;color:#f20707;font-weight:600;font-size:35px;margin:15px 15px 0 20px;}
h2{width:20px;color:#2320d6;font-weight:600;font-size:35px;margin:15px 15px 0 20px;}
h3{width:;color:black;font-weight:600;font-size:35px;margin:15px 15px 0 20px;}
`
const Kard=styled.div`
height:${props=>props.height}%;width:${props=>props.width}%;
`
const Card=styled.div`cursor:pointer;

height:${props=>props.height}%;width:${props=>props.width}%;background-color:white;border-radius:10px;
section{img{width:100%;border-radius:10px;}};
article{width:100%;height:100%;
  display:flex;justify-content:center;align-items:center;
  img{width:85%;}
}
`
const Deck=styled.div`
width:${props=>props.width};height:${props=>props.height};display:flex;flex-wrap:wrap;
justify-content:space-evenly;align-items:space-evenly;

`
const Tudo=styled.div`
h1{margin:40px 0 0px 20px;width:90%;font-size:26px;}
width:100vw;height:100vh;
background-color:#e8e6b0;
display:flex;flex-direction:column;align-items:center;
h6{color:brown;font-size:30px;width:250px;height:100%;display:flex;justify-content:center;align-items:center;}
`
const Btn=styled.button`display:flex;position:relative;
align-items:center;justify-content:space-evenly;;
cursor:pointer;font-size:20px;
  width:90%;height:70px;
  margin:${props=>props.primeiro?'70px 0px 0px 0':'30px 0 0 0'};
  border:0;border-radius:35px;
  background-color:${props=>props.cor?'orange':'lightblue'};
`