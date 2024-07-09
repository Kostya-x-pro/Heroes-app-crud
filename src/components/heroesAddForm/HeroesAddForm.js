import { useState, useEffect } from "react";
import {useDispatch } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import { heroHandleAdded, heroesFetching } from "../../actions";
// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const dispatch = useDispatch();
    const [hero, setHero] = useState({});
    const [maxId, setMaxId] = useState(4);
    const {request} = useHttp();

    const onValueChange = (e) => {
        setHero({
            ...hero,
            id: maxId, 
            [e.target.name]: e.target.value,
        })
    }

    const onAddHero = (e) => {
        e.preventDefault();
        setMaxId(maxId => maxId + 1);
        dispatch(heroHandleAdded(hero));
        request("http://localhost:3001/heroes", "POST", JSON.stringify(hero))
        setHero({
            name: '',
            description: '',
            element: '',
            id: ''
        })
    }


    
    return (
        <form 
        className="border p-4 shadow-lg rounded"
        onSubmit={onAddHero}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name"
                    value={hero.name}
                    onChange={onValueChange} 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="description" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="description" 
                    value={hero.description}
                    onChange={onValueChange} 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element"
                    value={hero.element}
                    onChange={onValueChange} 
                    name="element">
                    <option >Я владею элементом...</option>
                    <option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option>
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;