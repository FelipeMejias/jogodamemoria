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
import tubarao from './animais/tubarao.jpg'
import vaca from './animais/vaca.jpg'
import polvo from './animais/polvo.jpg'
import caran from './animais/caran.png'
import capaAnimais from './imgs/capa.jpg'
import './App.css';
import styled from 'styled-components'
import { useState } from 'react';
import { useEffect } from 'react';
import { getJogo, getJogos, jogar, postJogo, putJogo } from './api'
function shuffle(o) {
  for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
}
const listaPossiveis=[12,20,24]
const r12=JSON.parse(localStorage.getItem('r12'))||false
const r20=JSON.parse(localStorage.getItem('r20'))||false
const r24=JSON.parse(localStorage.getItem('r24'))||false
const listaR=[r12,r20,r24]
const lista24Nums=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]

function App() {
  const animais=[aguia,elefante,formiga,girafa,golfinho,leao,orca,orni,pinguim,rino,sapo,tigre,canguru,cobra,estrela,foca,marin,pato,tartaruga,dino,tubarao,vaca,polvo,caran]
  const marcas=[audi,bmw,chevrolet,citroen,renault,toyota,volkswagen,ferrari,honda,hyundai,fiat,ford,kia,lamborghini,landrover,mercedes,nissan,peugeot,maserati,mitsubishi,porsche,ram,suzuki,volvo]
  const [imagens,setImagens]=useState(false)
  const [emb,setEmb]=useState(false)
  
  const [tema,setTema]=useState(JSON.parse(localStorage.getItem('tema'))||1)
  const [rep,setRep]=useState(JSON.parse(localStorage.getItem('repete'))||1)
  const capa=tema==1?fusca:capaAnimais
  const [pares,setPares]=useState(JSON.parse(localStorage.getItem('pares'))||12)
  const [erros,setErros]=useState(0)
  const [comecou,setComecou]=useState(false)
  const [tipo,setTipo]=useState(localStorage.getItem('tipo')||1)
  const [flop,setFlop]=useState([])
  const [placar,setPlacar]=useState([0,0])
  const [vez,setVez]=useState(0)
  const [show,setShow]=useState(false)
  const [achados,setAchados]=useState(false)

  const [pageNomeBusca,setPageNomeBusca]=useState(false)
  const [text,setText]=useState('')
  const [nomes,setNomes]=useState(false)
  const [codigo,setCodigo]=useState(false)
  const [listaJogos,setListaJogos]=useState(false)
  const minhaVez=nomes[vez]==text
  const nomeOponente=nomes[0]==text?nomes[1]:nomes[0]
  function postarJogar(num){
    const response=jogar(codigo,num)
    response.then(res=>{
      const {nFlop,nVez}=res.data
      setFlop(nFlop)
      setVez(nVez)
      
        setTimeout(() => {
          if(nFlop.length==2)buscarJogo(codigo)
        }, 300);
    })
  }
  function buscarJogo(cod){
    
    const response=getJogo(cod)
    response.then(res=>{
      const {nFlop,nVez,nPlacar}=res.data
      setFlop(nFlop)
      setPlacar(nPlacar)
      setTimeout(() => {
        setVez(nVez)
      }, 300);
      setTimeout(() => {
        buscarJogo(cod)
      }, 2000);
    })
  }
  function esperarOponente(cod){
    const response=getJogo(cod)
    response.then(res=>{
      const {nNomes}=res.data
      if(nNomes[1]){
        setNomes(nNomes)
        setPageNomeBusca(false)
      }else{
        setTimeout(() => {
          esperarOponente(cod)
        }, 2000);
      }
    })
  }
  function postarJogo(){
    const response=postJogo(tema,rep,pares,text)
    response.then(res=>{
      buscarJogos()
      const {nPares,nCodigo,nImagens,nEmb}=res.data
      setCodigo(nCodigo)
      setImagens(nImagens)
      setEmb(nEmb)
      const arrayFalses=[]
      for(let k=0;k<nPares;k++){
        arrayFalses.push(false);arrayFalses.push(false);
      }
      setShow([...arrayFalses])
      setAchados([...arrayFalses])
      esperarOponente(nCodigo)
    })
  }
  function putarJogo(cod){
    const response=putJogo(cod,text)
    response.then(res=>{
      const {nTema,nRep,nNomes,nPares,nCodigo,nImagens,nEmb}=res.data
      setTema(nTema)
      setRep(nRep)
      setPares(nPares)
      setNomes(nNomes)
      setCodigo(nCodigo)
      setImagens(nImagens)
      setEmb(nEmb)
      const arrayFalses=[]
      for(let k=0;k<nPares;k++){
        arrayFalses.push(false);arrayFalses.push(false);
      }
      setShow([...arrayFalses])
      setAchados([...arrayFalses])
      setPageNomeBusca(false)
      buscarJogo(nCodigo)
    })
  }
  function buscarJogos(){
    const response=getJogos()
    response.then(res=>{
      setListaJogos(res.data)
    })
  }
  function encerrarJogo(pontos0,pontos1){
    let textoFim=tipo==1?`
            Boaaa! 
            Você completou ${pares} pares errando apenas ${erros}
            `:`
            ${pontos0>pontos1?(tipo==3?nomes[0]:'Vermelho'):pontos1>pontos0?(tipo==3?nomes[1]:'Azul'):'Empatou!'} ${pontos0==pontos1?'':'ganhou!'} 
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
    setComecou(textoFim)
  }
  function mudarFlop3(){
    if(tipo!=3)return
    const array=[]
    for(let k=0;k<pares;k++){
      array.push(false);array.push(false);
    }
    if(flop.length==0){setShow(array)}
    if(flop.length==1){
      const ar=[]
      for(let k=0;k<pares*2;k++){
        if(k==flop[0]){ar.push(true)}else{ar.push(false)}
      }
      setShow(ar)
    }
    if(flop.length==2){
      const ar=[]
      for(let k=0;k<pares*2;k++){
        if(k==flop[0]||k==flop[1]){ar.push(true)}else{ar.push(false)}
      }
      setShow(ar)
      setTimeout(()=>{
        if(emb[flop[0]]==emb[flop[1]]){
          const ar=[]
          for(let k=0;k<pares*2;k++){
            if(k==flop[0]||k==flop[1]){ar.push(true)}else{ar.push(achados[k])}
          }
          setAchados(ar)
          let acabou=true
          for(let item of ar){
            if(!item)acabou=false
          }
          if(acabou)encerrarJogo(placar[0],placar[1])
        }
      },1700)
    }
  }
  function mudarFlop(){
    if(tipo==3)return
    const array=[]
    for(let k=0;k<pares;k++){
      array.push(false);array.push(false);
    }
    const quemJogou=vez
    if(flop.length==0)setShow(array)
    if(flop.length==1){
      const ar=[]
      for(let k=0;k<pares*2;k++){
        if(k==flop[0]){ar.push(true)}else{ar.push(false)}
      }
      setShow(ar)
    }
    if(flop.length==2){
      const ar=[]
      for(let k=0;k<pares*2;k++){
        if(k==flop[0]||k==flop[1]){ar.push(true)}else{ar.push(false)}
      }
      setShow(ar)
      setVez(null)

      setTimeout(()=>{
        if(emb[flop[0]]==emb[flop[1]]){
          const ar=[]
          for(let k=0;k<pares*2;k++){
            if(k==flop[0]||k==flop[1]){ar.push(true)}else{ar.push(achados[k])}
          }
          let pontos0=placar[0]
          let pontos1=placar[1]
          if(vez==0)pontos0++
          if(vez==1)pontos1++
          setPlacar([pontos0,pontos1])
          setFlop([])
          setAchados(ar)
          setVez(rep==1?quemJogou:quemJogou==0?1:0)
          let acabou=true
          for(let item of ar){
            if(!item)acabou=false
          }
          if(acabou)encerrarJogo(pontos0,pontos1)
            
        }else{
          setErros(erros+1)
          setFlop([])
          setVez(quemJogou==0?1:0)
        }
      },1700)
    }
  }
  function iniciarJogo(){
    const array=[]
    const arrayFalses=[]
    for(let k=0;k<pares;k++){
      array.push(k);array.push(k);
      arrayFalses.push(false);arrayFalses.push(false);
    }
    const novoEmb=shuffle(array)
    setImagens(shuffle(lista24Nums))
    setEmb([...novoEmb])
    setShow([...arrayFalses])
    setAchados([...arrayFalses])
  }
  useEffect(buscarJogos,[])
  useEffect(mudarFlop,[flop])
  useEffect(mudarFlop3,[flop])
  return (
    comecou==false?
    <Tudo><Linha>
          <Btn selec={tipo==1} primeiro={true} onClick={()=>{setTipo(1);localStorage.setItem(`tipo`, JSON.stringify(1))}}>
          {tipo==1?<Sel><ion-icon name="checkmark-circle"></ion-icon></Sel>:<></>}
            solo
          </Btn>
          <Btn selec={tipo==2} primeiro={true}   onClick={()=>{setTipo(2);localStorage.setItem(`tipo`, JSON.stringify(2))}}>
          {tipo==2?<Sel><ion-icon name="checkmark-circle"></ion-icon></Sel>:<></>}
            confronto
          </Btn>
          <Btn selec={tipo==3} primeiro={true}   onClick={()=>{setTipo(3);localStorage.setItem(`tipo`, JSON.stringify(3))}}>
          {tipo==3?<Sel><ion-icon name="checkmark-circle"></ion-icon></Sel>:<></>}
            online
          </Btn>
          </Linha>
          
          <h4>Tema:</h4>
          <Linha>
          <Btn selec={tema==1}   onClick={()=>{setTema(1);localStorage.setItem(`tema`, JSON.stringify(1))}}>
            {tema==1?<Sel><ion-icon name="checkmark-circle"></ion-icon></Sel>:<></>}
            carros
          </Btn>
          <Btn selec={tema==2}  onClick={()=>{setTema(2);localStorage.setItem(`tema`, JSON.stringify(2))}}>
          {tema==2?<Sel><ion-icon name="checkmark-circle"></ion-icon></Sel>:<></>}
            animais
          </Btn>
          </Linha>
          <h4>Acertou repete:</h4>
          <Linha>
          <Btn selec={rep==1}   onClick={()=>{setRep(1);localStorage.setItem(`rep`, JSON.stringify(1))}}>
            {rep==1?<Sel><ion-icon name="checkmark-circle"></ion-icon></Sel>:<></>}
            sim
          </Btn>
          <Btn selec={rep==2}  onClick={()=>{setRep(2);localStorage.setItem(`rep`, JSON.stringify(2))}}>
          {rep==2?<Sel><ion-icon name="checkmark-circle"></ion-icon></Sel>:<></>}
            não
          </Btn>
          </Linha>
          <h4>Pares:</h4>
          <Linha>
    {listaPossiveis.map((num,index)=><Btn selec={pares==num} onClick={()=>{setPares(num);localStorage.setItem(`pares`, JSON.stringify(num))}}>
    <h5>{num}</h5>
    {pares==num?<Sel><ion-icon name="checkmark-circle"></ion-icon></Sel>:<></>}
    {listaR[index]?<Recorde><ion-icon name="trophy"></ion-icon><p> {listaR[index]} erros</p></Recorde>:<></>}
    </Btn>)}
    </Linha>
    <Comec onClick={()=>{
      setComecou(true)
      if(tipo==3){
        setPageNomeBusca(true)
        buscarJogos()
      }else{
        iniciarJogo()
      }
      }}>Jogar</Comec>
    </Tudo>:comecou!==true?<Tudo>
    <h6>{comecou}</h6>
    </Tudo>:
    pageNomeBusca?<Tudo>
      <input id="searchField" value={text} onChange={e=>{setText(e.target.value)}}  placeholder='Qual nome você quer usar?'></input>
      {listaJogos?<Quadro>
        {listaJogos?listaJogos.map(jogo=>{
          const {nPares,nNomes,nCodigo}=jogo
          return(
            <Joguinho>
              <p><strong>{nNomes[0]}</strong></p>
              <p>{nPares} pares</p>
              {text==''?<></>:nNomes[0]==text?<BotAc blueColor={true}>Esperando oponente</BotAc>
              :<BotAc onClick={()=>putarJogo(nCodigo)}>Aceitar desafio</BotAc>}
            </Joguinho>
          )
        }):<></>}
      </Quadro>:<h1>Carregando...</h1>}
      {text==''?<></>:<Comec onClick={()=>{
            postarJogo()
            }}>Postar desafio</Comec>}
    </Tudo>:
    <Tudo>
      {
        tipo==1?<Placar>
          <h3>erros: {erros}</h3>
          {vez===null?<Go cor={'transparent'}></Go>:<Go cor={'green'}>go!</Go>}
        </Placar>:<Placar>
          <section>
            <h1>{placar[0]}</h1>
            <h1><small>{nomes[0]}</small></h1>
          </section>
          {vez===null||vez==3?<Go cor={'transparent'}></Go>:tipo==3?<Go cor={minhaVez?'green':'#aaaaaa'}><p>{minhaVez?'sua vez':`vez de`}</p>{minhaVez?<></>:<p> {nomeOponente}</p>}</Go>:vez==0?<Go cor={'#f20707'}>go!</Go>:<Go cor={'#2320d6'}>go!</Go>}
          <section>
            <h2>{placar[1]}</h2>
            <h2><small>{nomes[1]}</small></h2>
          </section>
        </Placar>
      }
      {!emb||!tipo?<></>:<Deck  width={pares==24?'calc(66vh - 45px)':'calc(59vh - 45px)'} height={pares==12?'calc(100vh - 130px)':pares==20?'calc(100vh - 90px)':'calc(100vh - 130px)'}>
        {emb.map((num,index)=>{
          const width=pares==12?23:pares==20?18.4:15.3
          const height=pares==12?15:11.5
          return(
            achados[index]?
            <Kard width={width} height={height} ></Kard>
            :<Card width={width} height={height} onClick={()=>{
              
                if((flop.length==1&&flop[0]==index)){

                }else{
                  if(tipo==3){
                    if(minhaVez)postarJogar(index)
                  }else{
                    setFlop([...flop,index])
                  }
                  
                }
              }}>
            {!show[index]?<section><img src={capa}/></section>:
            <article><img src={(tema==1?marcas:animais)[imagens[num]]}/></article>}
          </Card>
          )})}
        </Deck>}
    </Tudo>
  );
}

export default App;
const Joguinho=styled.div`
width:90%;height:100px;position:relative;
background-color:white;margin:20px 0 0 0;
border-radius:15px;padding:0 0 0 10px;
p{strong{font-size:20px;}}
`
const BotAc=styled.div`
position:absolute;right:10px;top:10px;
display:flex;color:white;
align-items:center;justify-content:space-evenly;flex-direction:column;;
cursor:pointer;font-size:16px;flex-direction:column;
  width:160px;height:50px;font-weight:500;
  margin:30px 0px 0px 0%;
  border-radius:15px;
  background-color:${props=>props.blueColor?'blue':'green'};
  h5{margin:0 0 10px 0;font-size:20px;font-weight:500}
`
const Quadro=styled.div`
display:flex;align-items:center;
flex-direction:column;
height:calc(100% - 250px);width:90%;
overflow:hidden;
overflow-y:scroll;background-color:#8c883f;
  ::-webkit-scrollbar {width:12px}
  ::-webkit-scrollbar-thumb {background: #00702c; border-radius:5px;}
  ::-webkit-scrollbar-thumb:hover {background: #006028;}
`
const Sel=styled.div`
position:absolute;top:0px;
display:flex;align-items:center;justify-content:center;
font-size:30px;color:#3a90aa;
height:30px;width:30px;
left:0px;
`
const Recorde=styled.div`ion-icon{font-size:20px;}
background-color:#999901;width:100%;height:25px;
font-size:16px;display:flex;align-items:center;
justify-content:space-between;position:absolute;
bottom:0;padding:0 7px 0 7px;box-sizing:border-box;
p{margin:0px;}color:white;
border-bottom-left-radius:10px;
border-bottom-right-radius:10px;
`
const Go=styled.div`flex-direction:column;
display:flex;justify-content:space-evenly;align-items:center;
color:white;box-sizing:border-box;
background-color:${props=>props.cor};
width:90px;height:50px;border-radius:10px;
margin:15px 15px 0 20px;padding-bottom:8px;
font-weight:600;font-size:35px;

p{margin:0px;font-size:18px;line-height:18px;}
`
const Placar=styled.div`
width:100%;background-color:;
height:80px;display:flex;justify-content:space-evenly;
font-size:20px;
section{background-color:;
width:90px;
display:flex;flex-direction:column;align-items:center;
justify-content:space-evenly;height:100%;
small{font-size:18px;line-height:14px;}
};
h1{color:#f20707;font-weight:600;font-size:35px;margin:0 0 0 0;line-height:20px;}
h2{color:#2320d6;font-weight:600;font-size:35px;margin:0 0 0 0;line-height:20px;}
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
h4{margin:10px 0 0px 20px;font-size:26px;width:calc(100% - 20px)}
width:100vw;height:100vh;
background-color:#e8e6b0;
display:flex;flex-direction:column;align-items:center;
h6{color:brown;font-size:30px;width:250px;height:100%;display:flex;justify-content:center;align-items:center;}
input{background-color:#c4c185;font-size:18px;width:250px;height:50px;border:0;border-radius:10px;
padding:0 0 0 10px;margin:25px 0 25px 0;
}
`
const Linha=styled.div`
width:100%;display:flex;justify-content:;
`
const Btn=styled.button`display:flex;position:relative;color:black;
border:${props=>props.selec?'5px solid #3a90aa':'0'};
align-items:center;justify-content:space-evenly;flex-direction:column;;
cursor:pointer;font-size:20px;flex-direction:column;
  width:30%;height:70px;
  margin:${props=>props.primeiro?'20px 0px 0px 2.5%':'7px 0 0 2.5%'};
  border-radius:15px;
  background-color:${props=>props.cor?'orange':'#8bcce0'};
  h5{margin:0 0 10px 0;font-size:20px;font-weight:500}
`
const Comec=styled.button`border:0;
display:flex;position:relative;color:white;
align-items:center;justify-content:space-evenly;flex-direction:column;;
cursor:pointer;font-size:28px;flex-direction:column;
  width:95%;height:50px;font-weight:700;
  margin:30px 0px 0px 0%;
  border-radius:15px;
  background-color:green;
  h5{margin:0 0 10px 0;font-size:20px;font-weight:500}
`