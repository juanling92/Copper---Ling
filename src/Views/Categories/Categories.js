import React, {useEffect, useState} from 'react'
import './Categories.css'
import { useParams } from 'react-router';

import ItemDetail from '../../Components/ItemDetail/ItemDetail';

//Firebase
import {db} from '../../firebase/firebaseConfig';
import {collection, query, getDocs, where} from 'firebase/firestore';

const Categories = () => {
    const [itemDetail, setItemDetail] = useState([]);
    
    let category = useParams();

    useEffect ( () => {
    const getProducts = async () => {
    const q = query(collection(db, 'copper'), where('category','==',category.categoryId));
    const docs = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc)=>{
        docs.push({...doc.data(), id: doc.id});
    });
    setItemDetail(docs);
    };
    getProducts();
    },[category.categoryId])

    return (
        <>
        <div className='categorias'>
            {itemDetail.map((itemData) => {
                return <ItemDetail data={itemData} key={itemData.id}/>
            })}
        </div>

        </>
    )
}
export default Categories;
