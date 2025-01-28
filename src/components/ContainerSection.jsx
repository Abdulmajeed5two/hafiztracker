import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext } from 'react';
import { colors } from '../constant/Colors';
import { width } from '../constant/Size';
import { LanguageContext } from '../context/LanguageContext';
import { useNavigation } from '@react-navigation/native';

const ContainerSection = ({ sections }) => {
    const navigation = useNavigation();
    const { language } = useContext(LanguageContext);

    return (
        <View style={styles.container}>
            <View style={styles.grid}>
                {sections.map((section, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.card}
                        onPress={() => navigation.navigate(section.route)}
                    >
                        <Image source={section.icon} style={styles.icon} />
                        <Text style={styles.txt}>{language === 'English' ? section.label.en : section.label.other}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default ContainerSection;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginVertical: 16,
    },
    card: {
        backgroundColor: colors.white,
        width: (width - 64) / 3,
        height: (width - 64) / 3,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 8,
        elevation: 3,
        marginBottom: 16,
    },
    icon: {
        width: 40,
        height: 40,
        marginBottom: 8,
    },
    txt: {
        fontSize: 14,
        textAlign: 'center',
    },
});
