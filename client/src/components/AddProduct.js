import styles from './AddProduct.module.css'

import { useState } from "react"
import { useNavigate } from "react-router-dom"

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import * as productService from '../services/producService'

export const AddProduct = () =>{

    const [colorData, setColorData] = useState([
        {
            img: '',
            XS: '',
            S: '',
            M: '',
            L: '',
            price: '',
            code: '',
            images: []
        },
    ])
    const [productData, setProductData] = useState({
        name: '',
        type: 'suits',
        products: colorData,
        descModel: '',
        productInfo: ''
    })

    const navigate = useNavigate()

    const changeHandler = (e) => {
        setProductData(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    const colorChangeHandler = (e, i) => {
        let data = [...colorData]
        if (e.target.name === "images") {
            const files = Object.values(e.target.files)
            const imageBase64Promises = files.map((el) => {
                return new Promise((resolve) => {
                    const reader = new FileReader()
                    reader.readAsDataURL(el)
                    reader.onloadend = () => {
                        resolve(reader.result)
                    }
                })
            })
            Promise.all(imageBase64Promises).then((imageBase64) => {
                data[i][e.target.name] = imageBase64
                setColorData(data)
            })
        } else if (e.target.name === "img") {
            const file = e.target.files[0]
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                data[i][e.target.name] = reader.result
                setColorData(data)
            }
        } else {
            data[i][e.target.name] = e.target.value
            setColorData(data)
        }
    }


    const addColorForm = (e) => {
        e.preventDefault()
        let obj = {
            img: '',
            XS: '',
            S: '',
            M: '',
            L: '',
            price: '',
            code: '',
            images: []
        }
        setColorData([...colorData, obj])
        setProductData((prevState) => ({
            ...prevState,
            products: [...prevState.products, obj]
        }))
    }
    const removeColorForm = (e, i) => {
        e.preventDefault()

        let data = [...colorData]
        data.splice(i, 1)
        setColorData(data)
    }
    const MySwal = withReactContent(Swal)


    const submitHandler = async (e) => {
        e.preventDefault()
      
        MySwal.fire({
          title: 'Създаване на продукт',
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
          },
        })
      
        try {
          await productService.createProduct(productData)
          MySwal.close()
          navigate('/admin-qty-page')
        } catch (error) {
          MySwal.fire({
            title: <strong>{error.message}</strong>,
            icon: 'error',
          })
        }
      }

      
    return(
        <div className={styles['container']} >
        <form className={styles['form-cont']} onSubmit={submitHandler}>  
            <h1 className={styles['title']}>Добавяне на продукт</h1>
            <div className={styles['base-info']}>
                <div className={styles['base-item-cont']}>
                    <label htmlFor="">Име на продукта</label>
                    <input type="text" name='name' onChange={changeHandler} required />
                </div>
                <div className={styles['base-item-cont']}>
                    <label htmlFor="type">Тип на продукта</label>
                    <select name="type" id="type" onChange={changeHandler} required>
                        <option value="suits">Комплекти</option>
                        <option value="dress">Рокли</option>
                        <option value="pants">Панталони</option>
                        <option value="shirts">Блузи</option>
                        <option value="accessories">Аксесоари</option>
                    </select>
                </div>
                <div className={styles['base-item-cont']}>
                    <label htmlFor="type">Описание на продукта</label>
                    <textarea id="" cols="30" rows="2" name="descModel" onChange={changeHandler} required></textarea>
                </div>
                <div className={styles['base-item-cont']}>
                    <label htmlFor="type">Характеристики на продукта</label>
                    <textarea name="productInfo" id="" cols="30" rows="2" onChange={changeHandler} required></textarea>
                </div>
            </div>

            <button className={styles['add-color']} onClick={addColorForm}>Добавяне на цвят</button>

            {colorData.map((colorForm, i) => {
                return (
                    <div className={styles['color-cont']} key={i}>
                        <div className={styles['marketing-item']}>
                            <label htmlFor="code">Главна снимка</label>
                            <input type="file" name='img' onChange={(e) => colorChangeHandler(e, i)} required />
                            <div className={styles['picked-img']}>
                                <img src={colorData[i].img} alt="" />
                            </div>
                        </div>
                        <div className={styles['qty-cont']}>
                            <div className={styles['qty-item']}>
                                <label htmlFor="XS">XS</label>
                                <input type="number" name='XS' value={colorForm.XS} onChange={(e) => colorChangeHandler(e, i)} required />
                            </div>
                            <div className={styles['qty-item']}>
                                <label htmlFor="S">S</label>
                                <input type="number" name='S' value={colorForm.S} onChange={(e) => colorChangeHandler(e, i)} required />
                            </div>
                            <div className={styles['qty-item']}>
                                <label htmlFor="M">M</label>
                                <input type="number" name='M' value={colorForm.M} onChange={(e) => colorChangeHandler(e, i)} required />
                            </div>
                            <div className={styles['qty-item']}>
                                <label htmlFor="L">L</label>
                                <input type="number" name='L' value={colorForm.L} onChange={(e) => colorChangeHandler(e, i)} required />
                            </div>
                        </div>
                        <div className={styles['marketing-cont']}>
                            <div className={styles['marketing-item']}>
                                <label htmlFor="price">Цена</label>
                                <input type="number" name='price' value={colorForm.price} onChange={(e) => colorChangeHandler(e, i)} required />
                            </div>
                            <div className={styles['marketing-item']}>
                                <label htmlFor="code">Код на продукта</label>
                                <input type="text" name='code' value={colorForm.code} onChange={(e) => colorChangeHandler(e, i)} required />
                            </div>
                            <div className={styles['marketing-item']}>
                                <label htmlFor="code">Снимки</label>
                                <input type="file" name='images' multiple="multiple" onChange={(e) => colorChangeHandler(e, i)} required />
                                <div className={styles['picked-img']}>
                                    <img src={colorData[i].images[0] || ''} alt="" />
                                    <img src={colorData[i].images[1] || ''} alt="" />
                                    <img src={colorData[i].images[2] || ''} alt="" />
                                </div>
                            </div>
                            <button className={styles['remove-color']} onClick={(e) => removeColorForm(e, i)}>X</button>
                        </div>
                    </div>
                )
            })
            }

            <button className={styles['create-btn']} >Създай</button>
        </form>

    </div>
    )
}