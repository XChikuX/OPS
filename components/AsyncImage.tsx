import React, { useEffect, useState } from 'react';
import { authSequenceWithHeaders } from '../Utils/crypto';
import { View, Image } from 'react-native';

let placeholder_blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const thumbhash = 'X+cFJoTiRndeaaZ3iIhr+Fcvl5WARwk=';

const AsyncImage = ({ hash, blur = false, ...props }) => {
    const [imageSource, setImageSource] = useState(null);
    const [blurhash, setBlurhash] = useState(placeholder_blurhash);
    // Call the palette api if blur is true
    let url = `https://psync.dev/image/${hash}`;

    if (blur) {
        url = `https://psync.dev/image/${hash}/palette_3`;
    }

    useEffect(() => {
        const fetchImageSource = async () => {
            try {
                const source = await authSequenceWithHeaders(url);
                // Only get the blurhash if blur is true
                if (blur) {
                    try {
                        const response = await fetch(source.uri, {
                            method: source.method,
                            headers: source.headers
                        });
                        const data = await response.json();

                        if (blur) {
                            setBlurhash(data.blurhash);
                            setImageSource(null);
                        } else {
                            setImageSource(data.uri);
                        }
                    } catch (error) {
                        console.error('Error fetching image data:', error);
                    }
                }
                setImageSource(source);
            } catch (error) {
                console.error('Error fetching image source:', error);
            }
        };

        fetchImageSource();
    }, [url]);

    if (!imageSource) {
        return <View className="bg-[#191970] rounded-3xl mr-2" />;
    }

    return (
        <Image
            {...(blur ? { placeholder: blurhash } : { source: imageSource, placeholder: blurhash })}
            method="POST"
            {...props}
            transition={800}
        />

    );
};

export default AsyncImage;