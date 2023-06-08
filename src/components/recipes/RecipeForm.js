import React, { useState } from "react";
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
    console.log(imageAsUrl)
  };

  const handleFirebaseUpload = e => {
    e.preventDefault();

    if (imageAsFile === '') {
      console.error(`not an image, the image file is a ${typeof (imageAsFile)}`);
    }
    const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile);

    uploadTask.on('state_changed',
      (snapShot) => {
        setLoadingPhoto(true);
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
        <div className="form-group">
          <input
            id="name"
            type="text"
            value={recipe.name}
            required
            onChange={handleNewChange.bind(this, "name")}/>
          <span className="highlight"></span>
          <span className="bar"></span>
          <label htmlFor="name">Name</label>
        </div>
        <div className="form-group">
          <textarea
            id="description"
            required={true}
            cols={45}
            rows={8}
            placeholder="Description"
            defaultValue={recipe.description}
            onChange={handleNewChange.bind(this, 'description')}/>
        </div>
        <form>
          <input
            type="file"
            onChange={handleImageAsFile}/>
          <button
            className="btn btn-blue"
            disabled={loadingPhoto}
            onClick={handleFirebaseUpload}>Upload photo
          </button>
        </form>

        <hr/>
        <br/>
        {
          recipe.ingredients.map((val, idx) => {
            let ingredId = `ingredient-${idx}`, amountId = `amount-${idx}`;
            return (
              <div key={idx}>
                <legend><span className="number">{idx + 1}</span> Ingredient</legend>
                <div className="ingredients">
                  <div className="form-group">
                    <input
                      id={ingredId}
                      type="text"
                      name={ingredId}
                      data-id={idx}
                      className="name"
                      value={val.name}
                      required
                      onChange={handleNewChange.bind(this, "name")}/>
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label htmlFor={ingredId}>Name</label>
                  </div>
                  <div className="form-group">
                    <input
                      type="number"
                      data-id={idx}
                      name={amountId}
                      id={amountId}
                      className="amount"
                      defaultValue={val.amount}
                      min={0}
                      maxLength={3}
                      onChange={handleNewChange.bind(this, 'amount')}/>
                    <label htmlFor={amountId}>Amount</label>
                  </div>
                </div>
                <br/> <br/>
              </div>
            )
          })
        }
        <button className="btn btn-blue btn-small" onClick={addIngredient.bind(this)}>Add more</button>
        <br/> <br/>
        <hr/>
        <br/> <br/>
        <div className="form-group">
          <input
            type="number"
            id="difficultyLevel"
            max={5}
            min={1}
            value={recipe.difficultyLevel}
            onChange={handleNewChange.bind(this, "difficultyLevel")}/>
          <label htmlFor="difficultyLevel">Difficulty level</label>
        </div>
        <hr/>
        <br/> <br/>
        <div className="form-group">
          <input
            type="time"
            id="prepTime"
            value={recipe.prepTime}
            onChange={handleNewChange.bind(this, "prepTime")}/>
          <label htmlFor="prepTime">Preparation time</label>
        </div>
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
