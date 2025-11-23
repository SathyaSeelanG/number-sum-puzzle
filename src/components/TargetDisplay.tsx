import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TargetDisplayProps } from '../types/cell';
import { LinearGradient } from 'expo-linear-gradient';

export const TargetDisplay: React.FC<TargetDisplayProps> = ({
    targetValue,
    currentSum,
    score,
    level,
}) => {
    const isMatch = currentSum === targetValue && currentSum > 0;

    return (
        <View style={styles.container}>
            {/* Header Stats */}
            <View style={styles.statsRow}>
                <View style={styles.statBox}>
                    <Text style={styles.statLabel}>LEVEL</Text>
                    <Text style={styles.statValue}>{level}</Text>
                </View>

                <View style={styles.statBox}>
                    <Text style={styles.statLabel}>SCORE</Text>
                    <Text style={styles.statValue}>{score}</Text>
                </View>
            </View>

            {/* Target Display */}
            <View style={styles.targetContainer}>
                <Text style={styles.targetLabel}>TARGET SUM</Text>
                <View style={styles.targetBox}>
                    <Text style={styles.targetValue}>{targetValue}</Text>
                </View>
            </View>

            {/* Current Sum Display */}
            {currentSum > 0 && (
                <View style={styles.currentSumContainer}>
                    <Text style={styles.currentSumLabel}>CURRENT</Text>
                    <Text
                        style={[
                            styles.currentSumValue,
                            isMatch && styles.currentSumMatch,
                            currentSum > targetValue && styles.currentSumOver,
                        ]}
                    >
                        {currentSum}
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        backgroundColor: '#1A1A2E',
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    statBox: {
        alignItems: 'center',
        backgroundColor: '#2A2A3E',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 12,
        minWidth: 120,
        borderWidth: 1,
        borderColor: '#3A3A4E',
    },
    statLabel: {
        color: '#A0A0B0',
        fontSize: 12,
        fontWeight: '600',
        letterSpacing: 1,
        marginBottom: 4,
    },
    statValue: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
    },
    targetContainer: {
        alignItems: 'center',
        marginBottom: 15,
    },
    targetLabel: {
        color: '#A0A0B0',
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: 1.5,
        marginBottom: 10,
    },
    targetBox: {
        backgroundColor: '#6C5CE7',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 16,
        shadowColor: '#6C5CE7',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 12,
        elevation: 8,
        borderWidth: 2,
        borderColor: '#A29BFE',
    },
    targetValue: {
        color: '#FFFFFF',
        fontSize: 48,
        fontWeight: 'bold',
    },
    currentSumContainer: {
        alignItems: 'center',
        marginTop: 10,
    },
    currentSumLabel: {
        color: '#A0A0B0',
        fontSize: 12,
        fontWeight: '600',
        letterSpacing: 1,
        marginBottom: 4,
    },
    currentSumValue: {
        color: '#FFA500',
        fontSize: 32,
        fontWeight: 'bold',
    },
    currentSumMatch: {
        color: '#00D9A0',
    },
    currentSumOver: {
        color: '#FF6B6B',
    },
});
