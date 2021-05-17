import React, {useEffect, useState} from 'react';
import styles from './SideBlock.module.scss';
import Image from "next/image";
import CounterInput from 'react-counter-input';

export default function SideBlock({Datas, Callback}) {

    const [isOpened, setOpened] = useState(false)
    const [total, setTotal] = useState(0)
    const [countChanged, setChange] = useState(false)

    const handleDelete = (index) => {
        const Removed = Datas.splice(index, 1)
        let filteredDatas = Datas.filter(e => e !== Removed)
        Callback(filteredDatas)
    }

    useEffect(() => {
        let TotalPrice: number = 0
        for(let i = 0; i < Datas.length; i++) {
            TotalPrice = TotalPrice + Datas[i].costInRub * Datas[i].BuyingCount
        }
        TotalPrice = Number(TotalPrice.toFixed(2))
        setTotal(TotalPrice)
    },[countChanged, Datas])

    const handleChange = (count, Data) => {
        Data.BuyingCount = count
        setChange(!countChanged)
    }

    return (
        <>
            <div className={styles.root + ' ' + (isOpened ? styles.opened : styles.closed)}>
                <h2 className={styles.title}>Ваши покупки</h2>
                <div className={styles.openButton} onClick={() => {setOpened(!isOpened)}}>
                    <Image
                        src="/images/shopping-cart.svg"
                        alt="shopping-cart"
                        width={32}
                        height={32}
                    />
                </div>
                <div className={styles.cartWrap}>
                    {Datas.map((Data, i) =>
                        (
                            <div key={i} className={styles.cartUnit}>
                                <div className={styles.cartUnitName}>{Data.Name}</div>
                                <div className={styles.cartUnitPrice}>
                                    Цена: {Data.costInRub} руб./шт.
                                </div>
                                <div className={styles.cartUnitCount}>
                                    <CounterInput
                                        count={Data.BuyingCount}
                                        min={1}
                                        max={Data.Count}
                                        onCountChange={count => handleChange(count, Data) }
                                    />
                                    <span onClick={() => handleDelete(i)}>Удалить</span>
                                </div>
                            </div>
                        )
                    )}
                    <h2 className={styles.total}>Вcего: {total} руб.</h2>
                </div>
            </div>
        </>
    )
}