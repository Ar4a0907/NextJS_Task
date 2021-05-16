import React, { useState } from 'react';
import styles from './Block.module.scss';
import Image from 'next/image';


export default function Block({ Objects, group, Increase, parnetCallback }) {

    const [show, setShow] = useState(false)

    const handleClick = (object) => {
        parnetCallback(object)
    }

    return (
        <>
            <div className={styles.root}>
                <div className={styles.label} onClick={() => {setShow(!show)}}>
                    <Image
                        src="/images/arrow.svg"
                        alt="Arrow"
                        width={20}
                        height={20}
                        className={show ? styles.arrowOpen : styles.arrowClose}
                    />
                    <div className={styles.labelText}>{group}</div>
                </div>
                <div className={styles.content + ' ' + (show ? styles.contentOpen : styles.contentClose)}>
                    {Objects.map((Object,i) =>
                        (
                            (Object.Group == group) ?
                                <div key={i} className={styles.note}>
                                    <div className={styles.noteText}>{Object.Name} ({Object.Count})</div>
                                    <div className={styles.noteCost}>
                                        <div className={styles.price + ' ' + (Increase === true ?
                                            styles.costIncrease :
                                            styles.costDecrease)}>
                                            {Object.Cost}
                                        </div>
                                    </div>
                                    <div className={styles.buttonWrap}>
                                        <button className={styles.button} onClick={() => handleClick(Object)}>Купить</button>
                                    </div>
                                </div>:
                                null
                        )
                    )}
                </div>
            </div>
        </>
    )
}
