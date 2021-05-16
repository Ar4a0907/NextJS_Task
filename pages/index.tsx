import React, {useEffect, useState} from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css';
import { InferGetStaticPropsType } from 'next';
import namesdb from '../names.json';
import SideBlock from "../components/SideBlock/SideBlock";
import Block from "../components/Block/Block";

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

    const handleClick = (childData) => {
        console.log(childData)
        setCart([...cart, childData])
    }

    const fetchedObjects = (products, names) => {
        products.map((product) => (
            fetchedObj.push(
                {
                    "Group": names[product.G].G,
                    "Name": names[product.G].B[product.T].N,
                    "Cost": product.C,
                    "Count": product.P
               }
            )
        ))
    }

    const [dollarRate, setRate] = useState(null)
    const [prevRate, setPrev] = useState(null)
    const [increaseCost, setIncrease] = useState(null)

    useEffect(() => {
        setInterval(() => setRate(Math.floor(Math.random() * 31) + 50), 5000);
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
    }, [dollarRate])

  return (
    <div className={styles.container}>
        <main>
            <div>курс: {dollarRate}</div>
            <SideBlock Datas={cart} Exchange={dollarRate}/>
            {fetchedObjects(Products, namesdb)}
            <Block parnetCallback={handleClick} Objects={fetchedObj} group={fetchedObj[0].Group} Increase={increaseCost}/>
            <Block parnetCallback={handleClick} Objects={fetchedObj} group={fetchedObj[3].Group} Increase={increaseCost}/>
            <Block parnetCallback={handleClick} Objects={fetchedObj} group={fetchedObj[6].Group} Increase={increaseCost}/>
            <Block parnetCallback={handleClick} Objects={fetchedObj} group={fetchedObj[8].Group} Increase={increaseCost}/>
            <Block parnetCallback={handleClick} Objects={fetchedObj} group={fetchedObj[9].Group} Increase={increaseCost}/>
        </main>
    </div>
  )
}
