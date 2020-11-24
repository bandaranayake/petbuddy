import React, { memo } from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { Avatar, Divider, Paragraph, Title } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import { theme } from '../../core/theme';

function ServiceCard(props) {
    return (
        <View>
            <TouchableHighlight onPress={props.onPress} underlayColor={theme.colors.background}>
                <View style={styles.container}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Avatar.Text size={60} label='CW' />
                    </View>
                    <View style={{ flex: 3, alignItems: 'flex-start', marginLeft: 5 }}>
                        <Title >Carlos, Ward</Title >
                        <Rating
                            readonly
                            ratingCount={5}
                            imageSize={20}
                            showRating={false}
                        />
                        <Paragraph >Job Count (0)</Paragraph >
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Title>Level 1</Title>
                    </View>
                </View>
            </TouchableHighlight>
            <Divider />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default memo(ServiceCard);