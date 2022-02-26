const FilmGenre = ['ужасы','детектив','комедия'];
class Film extends React.Component{
    render(){
        const film = this.props.film;
        const onDelete = this.props.onDelete;
        const onViewed = this.props.onViewed;
        return(
          <div className="col">
            <div className="card mb-4 rounded-3 shadow-sm">
              <div color="#c66767" className="card-header py-3">
                <h4 className="my-0 fw-normal">{film.name}</h4>
              </div>
              <button id={film.name} className="btn-close" onClick={onDelete}></button>
                <h1 className="card-title pricing-card-title">{film.rating}<small className="text-muted fw-light">/10</small></h1>
                <h6>{film.data}</h6>
                <h6>{FilmGenre[Number(film.genre)]}</h6>
                <li>{film.description}</li>
                <button id={film.name+'1'} onClick={onViewed}>{film.viewed==='0'?'Несмотрел':'Смотрел'}</button>
            </div>
          </div>
        );
    }
}
class FormComponent extends React.Component{
    state ={
        addFilm:{name:'',genre:'',data:'',description:'',rating:'',viewed:''}
    }

    createNewFilm=(event)=>{
        const id = event.target.id;
        const addFilm = this.state.addFilm;
        switch (id) {
            case 'name': addFilm.name = event.target.value;break;
            case 'data': addFilm.data = event.target.value;break;
            case 'description': addFilm.description = event.target.value;break;
            case 'checkbox': addFilm.viewed = event.target.value==='on'?'0':'1';break;
            case 'select': addFilm.genre = event.target.value;break;
            case 'rating': addFilm.rating = event.target.value;break;
        }
        this.setState({addFilm: addFilm});
    }
    getFilm=()=> {
        return (this.state.addFilm);
    }
    addFilms=()=>{
        console.log('&&&');
        this.props.foo(
            this.state.addFilm
        )
    }
    render(){

        return(
            <div className="card mb-4 rounded-12">
                <div className="col-sm-6">
                    <label  className="form-label">Название:</label>
                    <input className="form-control" type ="text"  id="name" onChange={this.createNewFilm}/>
                </div>
                <div className="col-sm-3">
                    <label className="form-label">Дата:</label>
                    <input className="form-control" type="number" min="1940" max="2022" id="data" onChange={this.createNewFilm}/>
                </div>
                <div className="col-sm-6">
                    <label className="form-label">Описание:</label>
                    <textarea className="form-control" onChange={this.createNewFilm} type="text" id="description" />
                </div>
            <div className="col-sm-6">
                <label className="form-label">Жанр:</label>
                <select id="select" onChange={this.createNewFilm} className="form-select form-select-sm">
                    <option value="0">Ужасы</option>
                    <option value="1">Детективы</option>
                    <option value="2">Комедия</option>
                </select>
            </div>
            <div className="col-sm-6">
                <label className="form-label">Смотрел?</label>
                <input type="checkbox" id="checkbox" onChange={this.createNewFilm} />
            </div>
            <div className="col-sm-2">
                <label className="form-label">Оценка:</label>
                <input className="form-control" type="number" min="0" max="10" id="rating" onChange={this.createNewFilm} />
            </div>
            <button className="btn btn-danger" onClick={this.addFilms}>Добавить</button>
        </div>

        );
    }
}
class App extends React.Component{
    state = {
        film1:[{
            name: 'Tororo', genre: '1', data: '2001', description:'Хорошее аниме отличное, без перерыва сотрел ',rating: '2', viewed:'0'
        },{
          name: 'oro', genre: '2', data: '1999', description:'Хорошее аниме отличное, без перерыва сотрел ',rating: '2', viewed:'1'
        },{
          name: 'rro', genre: '2', data: '1994', description:'Хорошее аниме отличное, без перерыва сотрел ',rating: '2', viewed:'1'
        },{
          name: 'ror', genre: '0', data: '1998', description:'Хорошее аниме отличное, без перерыва сотрел ',rating: '2', viewed:'1'
        }
        ],
        film2:[{
          name: 'Tororo', genre: '1', data: '2001', description:'Хорошее аниме отличное, без перерыва сотрел ',rating: '2', viewed:'0'
        }],
        filter: {name: '', genre: '', data: '', viewed:''},
        sorted: '0',
    }
    onInputChange = (event) =>{
      this.setState({filter: {name: event.target.value}});
    }
    onButtonAll = () =>{
      this.setState({filter: {name: '',genre: '', data: '',viewed: ''}});
    }
    onButtonViewed = () =>{
      this.setState({filter: { viewed: '1'}});
    }
    onButtonNotViewed = () =>{

      this.setState({filter: {name: this.state.filter.name, genre: this.state.filter.genre, data: this.state.filter.data, viewed: '0'}});
    }
    onButtonGenre = (event) =>{
      this.setState({filter: {name: this.state.filter.name, genre:event.target.id, data: this.state.filter.data, viewed: this.state.filter.viewed}});
    }
    onButtonSort = (event) =>{
      let newFilms = [...this.state.film1];
      if(event.target.id==='b>'){
        newFilms.sort(function (a, b) {
          if (a.data > b.data) return 1;
          if (a.data < b.data) return -1;
          return 0;
        });
      }else{
        newFilms.sort(function (a, b) {
          if (a.data < b.data) return 1;
          if (a.data > b.data) return -1;
          return 0;
        });
      }
      if(this.state.sorted==='0'){
        this.setState({sorted: '1',film2: this.state.film1,film1: newFilms});
      }
      else this.setState({film1: newFilms});
    }
    onButtonNotSort = () =>{
      const oldFilms = this.state.film2;
      this.setState({sorted: '0',film1: oldFilms});
    }
    onDelete =(event)=>{
      const  films = this.state.film1;
      const arr = films.filter(item => item.name!==event.target.id);
      this.setState({film1: arr});
    }
    onViewed =(event)=>{
      let Films = this.state.film1;
      for (let i = 0; i < Films.length; i++) {
        if(Films[i].name+'1' === event.target.id){
          Films[i].viewed=Films[i].viewed==='1'?'0':'1';

        }
      }

      this.setState({film1: Films});
    }
    addFilms=(addFilm)=>{
      const arr = [...this.state.film1];
      arr.push(addFilm);
      console.log(arr);
      this.setState({film1:arr,});
    }
    render(){
      const  films = this.state.film1;
      const filter = this.state.filter;
      const filteredFilms = films.filter(function (film){
        return (film.name===filter.name||filter.name==='')&&film.viewed !== filter.viewed&&(film.genre === filter.genre||filter.genre==='');
      });
      return(
          <div class="conteiner">
          <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
            <div className='card mb-4 rounded-2 shadow-sm'>
              <h3>Фильтр по просмотру:</h3>
              <button className="btn btn-danger" onClick={this.onButtonAll}>All</button>
              <button className="btn btn-warning" onClick={this.onButtonViewed}>Несмотрел</button>
              <button className="btn btn-warning" onClick={this.onButtonNotViewed}>Смотрел</button><br/>
            </div>
            <div className='card mb-4 rounded-3 shadow-sm'>
              <h3>Фильтр по жанру:</h3>
              <button className="btn btn-warning" id='0' onClick={this.onButtonGenre}>Ужасы</button>
              <button className="btn btn-danger" id='1' onClick={this.onButtonGenre}>Детективы</button>
              <button className="btn btn-warning" id='2' onClick={this.onButtonGenre}>Комедия</button>
            </div>
            <div className='card mb-4 rounded-3 shadow-sm'>
              <h3>Сортировка по:</h3>
              <button className="btn btn-danger" id='b>' onClick={this.onButtonSort}>дата выхода(возр)</button>
              <button className="btn btn-warning" id='m<' onClick={this.onButtonSort}>дата выхода(убыв)</button>
              <button className="btn btn-danger" onClick={this.onButtonNotSort}>без сортировки</button>
            </div>
          </div>
          <div>
              <h3>Поиск:</h3>
              <input className="form-control" type="text"  onChange={this.onInputChange}/><br/>

            <div >
              { filteredFilms.map(film=>(<Film  onDelete= {this.onDelete}  onViewed={this.onViewed} film={film}/>)
              )}
            </div>
              <div>
              <FormComponent foo={this.addFilms}/>
            </div>
        </div>
          </div>
      );
    }
}



ReactDOM.render(<App />,document.getElementById('root'));