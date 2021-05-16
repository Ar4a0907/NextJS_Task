import React, {useState} from 'react';
import styles from './SideBlock.module.scss';
import Image from "next/image";

export default function SideBlock({Datas, Exchange}) {

    const [isOpened, setOpened] = useState(false);

    const howMuch = (cost) =>{
        let toRub = Exchange*cost
        toRub.toFixed(2)
        return toRub
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
                                <div className={styles.cartUnitPrice}> Цена: {howMuch(Data.Cost)} руб./шт.</div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </>
    )
}