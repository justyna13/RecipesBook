import React, {useState} from "react";
import { storage } from "../../config/firebaseConfig";



const RecipeForm = ({handleChange, handleSubmit, addIngredient, recipe, title}) => {

    const allInputs = {imgUrl: ''};
    const [loadingPhoto, setLoadingPhoto] = useState(false);
    const [imageAsFile, setImageAsFile] = useState('');
    const [imageAsUrl, setImageAsUrl] = useState(allInputs);

    const handleNewChange = (field, e) => {
        handleChange(field, e);
    };

    const handleImageAsFile = (e) => {
        const image = e.target.files[0];
        setImageAsFile(imageFile => (image));
    };

    const handleFirebaseUpload = e => {
      e.preventDefault();
      console.log('start upload', imageAsUrl);

      if (imageAsFile === '') {
          console.error(`not an image, the image file is a ${typeof(imageAsFile)}`);
      }
      const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile);

      uploadTask.on('state_changed',
          (snapShot) => {
              setLoadingPhoto(true);
              console.log(snapShot);
              console.log('uploaded worked');
          }, (err) => {
          console.log(err);
          }, () => {
          storage.ref('images').child(imageAsFile.name).getDownloadURL()
              .then(fireBaseUrl => {
                  setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}));
                  handleNewChange('imgUrl', fireBaseUrl);
                  setLoadingPhoto(false);
              })
          });

    };


    return (
        <div className="recipe__form">
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label> <br/>
                <input
                    type="text"
                    id="name"
                    required={true}
                    defaultValue={recipe.name}
                    style={{padding: '5px'}}
                    onChange={handleNewChange.bind(this, 'name')}/> <br/>

                <label htmlFor="description">Description</label> <br/>
                <textarea
                    id="description"
                    required={true}
                    cols={45}
                    defaultValue={recipe.description}
                    onChange={handleNewChange.bind(this, 'description')}/>  <br/> <br/>

                <form>
                    <input
                        type="file"
                        onChange={handleImageAsFile}
                    />
                    <button
                        className="btn btn-blue"
                        disabled={loadingPhoto}
                        onClick={handleFirebaseUpload} >Upload photo</button>
                </form>

                <hr/>

                <br/>
                {
                    recipe.ingredients.map( (val, idx) => {
                        let ingredId = `ingredient-${idx}`, amountId = `amount-${idx}`;
                        return (
                            <div key={idx}>
                                <legend><span className="number">{idx + 1}</span> Ingredient</legend>
                                <div className="ingredients">
                                    <div>

                                        <label htmlFor={ingredId}>Name</label> <br/>
                                        <input
                                            type="text"
                                            name={ingredId}
                                            data-id={idx}
                                            id={ingredId}
                                            className="name"
                                            defaultValue={val.name}
                                            min={0}
                                            onChange={handleNewChange.bind(this, 'name')}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor={amountId}>Amount</label> <br/>
                                        <input
                                            type="number"
                                            data-id={idx}
                                            name={amountId}
                                            id={amountId}
                                            className="amount"
                                            defaultValue={val.amount}
                                            min={0}
                                            maxLength={3}
                                            onChange={handleNewChange.bind(this, 'amount')}
                                        />
                                    </div>

                                </div>
                                <br/> <br/>
                            </div>

                        )
                    })
                }
                <br/>
                <button className="btn btn-blue btn-small" onClick={addIngredient.bind(this)}>Add more </button> <br/> <br/>
                <hr/>
                <label htmlFor="difficultyLevel">Difficulty level</label> <br/>
                <input
                    type="number"
                    id="difficultyLevel"
                    max={5}
                    min={1}
                    value={recipe.difficultyLevel}
                    onChange={handleNewChange.bind(this,"difficultyLevel" )}/> <br/> <br/>
                <hr/>
                <label htmlFor="prepTime">Preparation time</label> <br/>
                <input
                    type="time"
                    id="prepTime"
                    value={recipe.prepTime}
                    onChange={handleNewChange.bind(this,"prepTime" )}/> <br/> <br/>

                <button
                    disabled={loadingPhoto}
                    className="btn btn-blue">{title}</button>
                {loadingPhoto ?
                <div>Uploading photo...</div>
                : null}
            </form>
        </div>
    );

};

export default RecipeForm;
