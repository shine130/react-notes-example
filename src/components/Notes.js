import React,{Component} from 'react'
import Note from './Note'
import { loadCollection,db} from '../database'

class Notes extends Component {
  constructor(props){
    super(props)
    this.getInitialData()
  }

  state = {
    entities:[]
  }

  getInitialData(){
    loadCollection('notes')
      .then((collection) =>{

        // collection.insert([
        //   {body:'hello~'},
        //   {body:'hello2~'}
        // ])

        // db.saveDatabase()

        const entities = collection.chain()
          .find()
          .simplesort('$loki','isdesc')
          .data()

          this.setState({
            entities
          })

          // console.log(entities)
      })
  }

  createEntity = () => {
    loadCollection('notes')
      .then((collection) => {
        const entity = collection.insert({
          body:''
        })
        db.saveDatabase()
        this.setState((prevState) => {
          const _entities = prevState.entities
          _entities.unshift(entity)
          return {
            entities:_entities
          }
        })
        
      })


  }
 

  render () {

    const {entities} = this.state
    const noteItems = entities.map((entity) => 
      <Note
        key={entity.$loki}
        entity={entity}
      />
    )



    return (
      <div className="ui container notes">
          <h4 className="ui horizontal divider header">
            <i className="paw icon"></i>
            shine Notes App _ React.js
          </h4>
          <button className="ui right floated basic violet button" onClick={this.createEntity}>添加笔记</button>
          <div className="ui divided items">
            {noteItems}
            {!entities.length &&
              <span className="ui small disabled header">
              还没有笔记，请按下'添加笔记'按钮
              </span>
            }
          </div>
      </div>
    )
  }
}

export default Notes