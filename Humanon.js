import React from 'react'
import { Image, View, Text, StyleSheet, StatusBar, TouchableHighlight, Alert } from 'react-native'
import * as Progress from 'react-native-progress';

export default function Humanon() {
    const [turn, setTurn] = React.useState(1);
    //1 = User
    //0 = Opp

    const [user, setUser] = React.useState({
        hp: 100,
        atk: 10,
        def: 5,
        lvl: 1,
    })

    const [opp, setOpp] = React.useState({
        hp: 100,
        atk: 10,
        def: 5,
        lvl: 1,
    })

    const sleep = ms => 
        new Promise(resolve => setTimeout(resolve, ms)
    )

    let endGame = user.hp <= 0 || opp.hp <=0 ? true : false

    let userTurn = turn === 1 ? false : true

    function damage(def, atk){
        // 1/3 chance for extra DMG (if less than 3, no extra dmg)
        let extraDmg = (Math.floor(Math.random()*(4-1))+1<3) ? 0 : Math.floor(Math.random()*atk+1)

        // 2/3 chance to fully block DMG (if less than 3, use all def, else use some def if any)
        let defBlock = (Math.floor(Math.random()*(4-1))+1<3 ? def : Math.floor(Math.random()*def))

        //resulting math
        return atk + extraDmg - defBlock
    }

    const attack = () => {
        //send def/atk data
        let dmgAmt = damage(opp.def, user.atk)
        //hp - dmg amount
        let dmgt = opp.hp-dmgAmt
        //change stats
        setOpp(opp=>({...opp, hp:dmgt}))

        // Alert.alert(`User damages the Opponent for ${dmgAmt}`)

        //change turn
        setTurn(0)
        //do Opponent Choice
        return oppChoice()
    }

    const heal = () => {
        if(user.hp >= 100){
            Alert.alert("You don't need to heal right now!")
            return null
        }

        //heal amount
        let healAmt = Math.floor(Math.random()*(15-1))+1
        //hp + heal amount
        let healed = user.hp + healAmt
        //change stats
        setUser(user=>({...user, hp:healed}))
        //change turn

        // Alert.alert(`User heals for ${healAmt}`)

        setTurn(0)
        //do Opponent Choice
        return oppChoice()
    }

    const oppChoice = () =>{
        sleep(2000).then(()=>{
            if(opp.hp < 60){
                if(Math.floor(Math.random()*(4-1))+1<3){
                    //heal amount
                    let healAmt = Math.floor(Math.random()*(10-3))+1
                    //heal amount
                    let healed = opp.hp + healAmt
                    //change stats
                    setOpp(opp=>({...opp, hp:healed}))

                    Alert.alert(`Opponent heals for ${healAmt}`)

                    //change turn
                    return setTurn(1)
                }
                else{
                    //damage
                    let dmgAmt = damage(user.def, opp.atk)
                    //send def/atk data
                    let dmgt = user.hp - dmgAmt
                    //change stats
                    setUser(user=>({...user, hp:dmgt}))

                    console.log("Amount: ", dmgAmt)

                    Alert.alert(`Opponent damages the User for ${dmgAmt}`)

                    //change turn
                    return setTurn(1)
                }
            }
            else{
                //damage
                let dmgAmt = damage(user.def, opp.atk)
                //send def/atk data
                let dmgt = user.hp - dmgAmt
                //change stats
                setUser(user=>({...user, hp:dmgt}))

                console.log("Amount: ",dmgAmt)

                Alert.alert(`Opponent damages the User for ${dmgAmt}`)
                //change turn
                return setTurn(1)
            }
        
        })
        
        
    }
  
return (
    <View style={styles.container}>
        <StatusBar barStyle="dark-content" hidden={false} />

        <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Turn: {turn === 1 ? "User" : "Opponent"}</Text>
        
        <TouchableHighlight onPress={() => { } } style={{display: !endGame ? "none" : "flex"}}>
            <View style={styles.button}>
                <Text style={{fontWeight: 'bold'}}>Reset Game</Text>
            </View>
        </TouchableHighlight>

        <Text>
            {'\n'}
        </Text>

        <View style = {{justifyContent:'center', alignItems:'center'}}>
            <Image
                source={{ uri: 'https://reactjs.org/logo-og.png' }}
                style={styles.image} />
                <Text style={{ fontWeight: 'bold'}}> {'\n'}Opponent {'\n'}</Text>
            <Text> 
                <Progress.Bar progress={opp.hp/100} color={"#FF4D4D"} width={200} />{'\n'} 
                HP: {opp.hp}/100 {'\n'}
                Atk: {opp.atk} {'\n'}
                Def: {opp.def} {'\n'}
            </Text>
        </View>

        <Text>{'\n'}</Text>
        
        <View style={styles.row}>
            <Image
                source={{ uri: 'https://reactjs.org/logo-og.png' }}
                style={{ width: 100, height: 100 }} />
            <Text style={{padding:10, margin:"auto"}}>                
                <Text style={{ fontWeight: 'bold'}}>User</Text>{'\n'}{'\n'}

                <Progress.Bar progress={user.hp/100} color={"#FF4D4D"} width={200} />{'\n'}
                HP: {user.hp}/100 {'\n'}
                Atk: {user.atk} {'\n'}
                Def: {user.def} {'\n'}
            </Text>
        </View>

        <Text>{'\n'}</Text>
        <View style={styles.row}>
            <TouchableHighlight style={styles.atkbut} onPress={() => attack("o")} disabled={userTurn || endGame}>
                <View>
                    <Text style={{fontWeight: 'bold'}}>Attack!</Text>
                </View>
            </TouchableHighlight>

            <TouchableHighlight style={styles.healbut} onPress={() => heal("o")} disabled={userTurn || endGame}>
                <View>
                    <Text style={{fontWeight: 'bold'}}>Heal!</Text>
                </View>
            </TouchableHighlight>
        </View>
        
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    marginHorizontal: "auto",
    width: 400,
    justifyContent:'center',
    alignItems:'center'
  },
  row:{
    flexDirection: "row"
  },
  healbut:{
    alignItems: 'center',
    backgroundColor: '#4DFF7A',
    padding: 10,
    margin: 10
  },
  atkbut:{
    alignItems: 'center',
    backgroundColor: '#FF4D4D',
    padding: 10,
    margin: 10
  },
  button:{
    alignItems: 'center',
    backgroundColor: '#C44DFF',
    padding: 10,
    margin: 10
  },
  image: {
    width: 100, 
    height: 100,
  },
})