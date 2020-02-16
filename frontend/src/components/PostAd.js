import React, { useState } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { postAd } from '../actions/ad';
import { MdAddAPhoto } from 'react-icons/md'

const PostAd = ( { postAd } ) => {

  const [ postForm, setPostForm ] = useState({
    title : '',
    location : '',
    description : '',
    image : ''
  })

  const { title, location, description, image} = postForm;

  const onChange = e =>  
    setPostForm({ ...postForm, [e.target.name] :([e.target.name] == "image" ? e.target.files[0] :e.target.value) });

  const onSubmit = async e => {
    e.preventDefault();

    
    const fd = new FormData();
    fd.append('image', image);
    fd.append('title', title);
    fd.append('description',description);
    fd.append('location', location);

    postAd(fd);
  }

  // const onClick = e => {
  //   setPostForm({ ...postForm, image : e.target.files[0]}); 
  //   console.log(image);
  // }

  // const onUpload = async () => {

  //   console.log('entered on upload');
  //   const fd = new FormData();
  //   fd.append('image', image);

  //   console.log(fd);

  //   try {
  //    const res = await axios.post('http://localhost:5000/api/postAd/upload', fd);
     
  //    console.log(res.statusText);
  //    console.log('image uploaded successfully');
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }



  return (
    <div className="m-auto border shadow-lg forms ">
        <h4 className='text-center'><MdAddAPhoto/> Post an Ad</h4>
        {/* <form encType='multipart/form-data'>
        <input
            type="file"
            className="form-control"
            id="image"
            placeholder="upload photo"
            name="image"
            onChange={e => onClick(e)}
          />
          <button onClick={() => onUpload()}>upload</button>
        </form> */}
        
      <form className="py-2 px-5" onSubmit={e => onSubmit(e)} encType="multipart/form-data">
        <div className="form-group">
          <label htmlFor="name">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            placeholder="Enter the title"
            value={title}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            className="form-control"
            name="location"
            placeholder="Enter location"
            value={location}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            className="form-control"
            name="description"
            placeholder="Enter the description"
            value={description}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="photo">Upload Photo</label>
          <input
            type="file"
            className="form-control"
            id="photo"
            placeholder="upload photo"
            name="image"
            onChange={e => onChange(e)}
          />
        </div>

        <button type="submit" className="btn btn-success mt-2">
          Submit
        </button>
      </form>
    </div>
  );
};

PostAd.propTypes = {
  postAd : PropTypes.func.isRequired,
}


export default connect(null, { postAd })(PostAd);
