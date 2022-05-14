import React, { useCallback, useState } from 'react'
import { useEffect } from 'react'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db, storage } from '../../../InitApp'
import { useFocusEffect } from '@react-navigation/native'
import { getDownloadURL, ref } from 'firebase/storage'
import Spinner from '../../atoms/Spinner/Spinner.component'
import { ScrollView } from 'react-native-gesture-handler'
import Heading from '../../atoms/Heading/Heading.component'
import Paragraph from '../../atoms/Paragraph/Paragraph.component';
import { useSelector, useDispatch } from 'react-redux';
import { StyledCard, StyledImage, StyledLinear, StyledUserInfo } from './ListUsers.styled'
import Button from '../../atoms/Button/Button.component'
import { handleLogout } from '../../../redux/authReducer'

const ListUsers = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>([]);
    const [votes, setVotes] = useState<any>([]);
    const userData:any = useSelector<any>(store => store.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const actualVotes = Object.values(votes);
    },[votes])

    useFocusEffect(
        useCallback(() => {
            getDocuments();
    }, []))

    const handleSignOut = () => {
        dispatch(handleLogout());
    }

    const getDocuments = async () => {
        setLoading(true);
        setData([]);
            try {
                const querySnapshot = await getDocs(query(collection(db, "users"),orderBy('lastName','asc')));
                querySnapshot.forEach(async (doc) => {
                    const res:any = {...doc.data(), id:doc.id};
                    const imageUrl = await getDownloadURL(ref(storage, res.image));
                    setData(arr => [...arr, {...res, imageUrl: imageUrl}]);
                });
            } catch (error) {
                console.log(error)                    
            }finally{
                setLoading(false);
            }
    }

    return (
    <ScrollView>
        <StyledLinear colors={["#a8c0ff", "#3f2b96"]}>
            {loading && <Spinner />}
            {data.map((item) => (
                <StyledCard>
                    <StyledImage source={{uri:item.imageUrl}} resizeMode="cover" />
                    <StyledUserInfo >
                        <Heading style={{color:'black'}}>{item.lastName}, {item.name}</Heading>
                        <Heading>DNI: {item.dni}</Heading>
                        <Paragraph>Email: {item.email}</Paragraph>
                    </StyledUserInfo>
                </StyledCard>
            ))}
            {!loading && <Button onPress={handleSignOut}>Cerrar sesión</Button>}
        </StyledLinear>
    </ScrollView>
    )
}

export default ListUsers