import React from 'react';
import { Image, View } from 'react-native';
import { IMAGE_STAR } from '../../assets/images';

function Rating(props) {
    let stars = [];
    let rating = props.rating;

    for (let i = 0; i < props.count; i++) {
        stars.push(<Image key={i} source={IMAGE_STAR} style={{ width: props.size, height: props.size, backgroundColor: (rating-- > 0) ? '#f1c40f' : '#fff' }} />);
    }

    return <View style={{ flexDirection: 'row', alignItems: 'center' }}>{stars}</View>
}

export default Rating;