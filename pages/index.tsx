import React, {useEffect, useState} from 'react';
import styles from '../styles/Home.module.css';
import { InferGetStaticPropsType } from 'next';
import namesdb from '../names.json';
// @ts-ignore
import SideBlock from '../components/sideBlock/SideBlock';
// @ts-ignore
import Block from '../components/block/Block';

type Product = {
    G: number
    C: number
    T: number
    P: number
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const getStaticProps = async () => {
    const res = await fetch('http://localhost:4200/Goods')
    const Products: Product[] = await res.json()
    return {
        props: { Products }
    }
    await sleep(15000)
    await getStaticProps()
}

export default function Home({ Products }: InferGetStaticPropsType<typeof getStaticProps> ) {

    const fetchedObj: (any)[] = [];

    const [cart, setCart] = useState([])

    function containsObject(obj, list) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].Name === obj.Name) {
                return true;
            }
        }
        return false;
    }

    const handleClick = (childData) => {
        if(!containsObject(childData,cart)) {
            childData.costInRub = (dollarRate * childData.Cost).toFixed(2)
            setCart([...cart, childData])
        }
    }

    const handleChange = (childData) => {
            setCart([])
            setCart(childData)
    }


    const fetchedObjects = (products, names) => {
        products.map((product) => (
            fetchedObj.push(
                {
                    "Group": names[product.G].G,
                    "Name": names[product.G].B[product.T].N,
                    "Cost": product.C,
                    "Count": product.P,
                    "BuyingCount": 1
               }
            )
        ))
    }

    const [dollarRate, setRate] = useState(50)
    const [prevRate, setPrev] = useState(null)
    const [increaseCost, setIncrease] = useState(null)

    useEffect(() => {
        setInterval(() => setRate(Math.floor(Math.random() * 31) + 50), 20000);
    }, []);

    useEffect(() => {
        if (prevRate !== null) {
            if (dollarRate > prevRate) {
                setIncrease(true)
            } else {
                setIncrease(false)
            }
        }
        setPrev(dollarRate)
    }, [dollarRate, cart])

  return (
    <div className={styles.container}>
        <main>
            <SideBlock Datas={cart} Callback={handleChange}/>
            {fetchedObjects(Products, namesdb)}
            <div className='block'>курс: {dollarRate}</div>
            <Block parnetCallback={handleClick} Objects={fetchedObj} group={fetchedObj[0].Group} Increase={increaseCost}/>
            <Block parnetCallback={handleClick} Objects={fetchedObj} group={fetchedObj[3].Group} Increase={increaseCost}/>
            <Block parnetCallback={handleClick} Objects={fetchedObj} group={fetchedObj[6].Group} Increase={increaseCost}/>
            <Block parnetCallback={handleClick} Objects={fetchedObj} group={fetchedObj[8].Group} Increase={increaseCost}/>
            <Block parnetCallback={handleClick} Objects={fetchedObj} group={fetchedObj[9].Group} Increase={increaseCost}/>
        </main>
    </div>
  )
}
