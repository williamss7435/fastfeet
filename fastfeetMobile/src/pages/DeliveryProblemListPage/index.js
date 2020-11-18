import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';

import Background from '../../components/BackgroundComponent';
import FastFeetAPI from '../../services/FastFeetAPI';
import {
    Container,
    Title,
    ProblemItem,
    ProblemText,
    ProblemDateText,
    Shimmer,
} from './styles';

export default function DeliveryProblemListPage({route}) {
    const {id, product} = route.params;
    const [loading, setLoading] = useState(true);
    const [problems, setProblems] = useState([]);

    useEffect(() => {
        (async function getProblems() {
            setLoading(true);
            const response = await FastFeetAPI.getAllOrderProblemByOrderId(id);

            if (response.success) {
                setProblems(response.data);
            }

            setLoading(false);
        })();
    }, [id]);

    return (
        <Container>
            <Background>
                <Title>{product}</Title>
                {loading ? (
                    <>
                        <Shimmer />
                        <Shimmer />
                        <Shimmer />
                        <Shimmer />
                        <Shimmer />
                        <Shimmer />
                        <Shimmer />
                    </>
                ) : (
                    <>
                        <FlatList
                            data={problems}
                            keyExtractor={(item) => String(item.id)}
                            renderItem={(item) => (
                                <ProblemItem>
                                    <ProblemText>
                                        {item.item.description}
                                    </ProblemText>
                                    <ProblemDateText>
                                        {item.item.start_date_formatted}
                                    </ProblemDateText>
                                </ProblemItem>
                            )}
                        />
                    </>
                )}
            </Background>
        </Container>
    );
}
