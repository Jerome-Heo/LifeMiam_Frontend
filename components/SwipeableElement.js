
import React, { useEffect, useRef, useState } from 'react';
import { Animated, PanResponder, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from "../utilities/color";
// let data = [];
// for (let i = 0; i < 20; i += 1) data.push(i);

// const leftButtons = ['btn1', 'btn2', 'btn3'];
const rightButtons = ['Acheter', 'Non trouvé'];
const btnWidth = 80;
const offset = [-btnWidth * rightButtons.length, btnWidth /* * leftButtons.length*/ ];


// export default function SwipableListButton({name, quantity,unit}) {
//     return (
//         <ScrollView>
//             {data.map(item => (
//                 <SwipableItem key={item} name={name}  quantity={quantity}  unit={unit}    />
//             ))}
//         </ScrollView>
//     )
// }

export default function SwipableItem({name , quantity,unit}) {
    let panValue = { x: 0, y: 0 };
    let isOpenState = useRef(false).current;
    const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const itemTranslate = pan.x.interpolate({ inputRange: offset, outputRange: offset, extrapolate: 'clamp' });
    
    const [isOpen,setIsOpen]=useState(false)
    const [isDisabled,setIsDisabled]=useState(false)
    const [isFound,setIsFound]=useState(false)

    // const translateLeftBtns = pan.x.interpolate({ inputRange: [-leftButtons.length * btnWidth, 0], outputRange: [-leftButtons.length * btnWidth, 0], extrapolate: 'clamp' });
    const translateRightBtns = pan.x.interpolate({ inputRange: [0, rightButtons.length * btnWidth], outputRange: [0, rightButtons.length * btnWidth], extrapolate: 'clamp' });
    useEffect(() => {
        pan.addListener(value => {
            panValue = value;
        });
    }, [])
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => false,
            onMoveShouldSetPanResponderCapture: (e, g) => Math.abs(g.dx) > 10,
            onMoveShouldSetPanResponder: (e, g) => false,
            onPanResponderGrant: () => {
                pan.setOffset({ x: panValue.x, y: panValue.y });
                pan.setValue({ x: 0, y: 0 });
            },
            onPanResponderMove: Animated.event([null, { dx: pan.x }], {
                useNativeDriver: false,
            }),
            onPanResponderRelease: (e, g) => {
                pan.flattenOffset();
                /*
                if (g.vx > 0.5 || g.dx > btnWidth * leftButtons.length / 2) {
                    if (isOpenState && g.dx > 0) {
                        reset();
                        return;
                    }
                    move(false);
                    return;
                }
                */
                if (g.vx < -0.5 || g.dx < -btnWidth * rightButtons.length / 2) {
                    if (isOpenState && g.dx < 0) {
                        reset();
                        return;
                    }
                    move(true);
                    return;
                }
                reset()

            },
            onPanResponderTerminate: () => {
                reset();
            },
        }),
    ).current;
    const reset = () => {
        isOpenState = false;
        setIsOpen(false)
        Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
            bounciness: 0
        }).start();
    }
    const move = (toLeft) => {
        isOpenState = true;
        setIsOpen(true)
        Animated.spring(pan, {
            toValue: { x: toLeft ? -btnWidth * rightButtons.length : btnWidth /* * leftButtons.length*/ , y: 0 },
            useNativeDriver: true,
            bounciness: 0
        }).start();
    }

    const buyedItem= ()=> {
        setIsDisabled(!isDisabled)

    }

    const foundItem= ()=> {
        setIsFound(!isDisabled)
       
    }


    return (
        <View style={styles.container}>
            {/* <Animated.View style={[styles.btnContainer, { transform: [{ translateX: translateLeftBtns }], }]}>
                {leftButtons.map(btn => (
                    <TouchableOpacity onPress={reset} key={btn} style={[styles.btn, { backgroundColor: 'red' }]}>
                        <Text>{btn}</Text>
                    </TouchableOpacity>
                ))}
            </Animated.View> */}
            <Animated.View style={[styles.btnContainer, { transform:[{ translateX: translateRightBtns }], alignSelf: 'flex-end' }]}>
                
                    <TouchableOpacity onPress={()=> {buyedItem()}} style={[styles.btn, !isDisabled ? { backgroundColor: Colors.DARK_GREEN } : { backgroundColor: Colors.YELLOW }]}>
                        <Text style={!isDisabled ? {textAlign:'center',color:'#fff' } : {textAlign:'center'  } }>{isDisabled ? 'Reposer' : 'Acheter' }</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=> {foundItem()}} style={[styles.btn, !isFound ? {backgroundColor: Colors.DARK_GREEN } : { backgroundColor: Colors.YELLOW }]}>
                        
                          <Text style={!isFound ? {textAlign:'center',color:'#fff' } : {textAlign:'center'  } }>{isFound ? 'Non trouvé' : 'trouvé' }</Text>
                    </TouchableOpacity>
               
            </Animated.View>
            <Animated.View style={[!isOpen ? styles.item : styles.itemOpen, { transform: [{ translateX: itemTranslate }] }]} {...panResponder.panHandlers} >
                <Text style={styles.txt}>{name}</Text>
                <Text style={styles.txt}>{quantity} {unit}</Text>
                
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 80,
        width: '100%',
        marginBottom: 3,
    },
    item: {
        height: '100%',
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        
        backgroundColor: Colors.LIGHT_GREEN,
        paddingHorizontal:20
    },
    itemOpen: {
        height: '100%',
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: '50%',
        backgroundColor: Colors.LIGHT_GREEN,
        transform: [{translateX: '50%'}],
        paddingHorizontal:20
    },
    txt: {
        color: '#fff',
        letterSpacing: 1,
        textAlign:'left'
    },
    btnContainer: {
        height: '100%',
        position: 'absolute',
        flexDirection: 'row'
    },
    btn: {
        height: '100%',
        width: btnWidth,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
})