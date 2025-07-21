import React, { JSX } from 'react';
import {Resultado} from '../tipos';

interface ResultListProps {
    styles: any;
    results: Array<Resultado>;
}
  
export default function ResultTable({ styles, results }: ResultListProps) {
    if (results.length == 0) {
        return null;
    }
    return (
        <table className={styles.resultTable}>
            <thead>
                <tr>
                    <th>Nome da Imagem</th>
                    <th>% de ser gleason 3</th>
                    <th>% de ser gleason 4</th>
                    <th>% de ser gleason 5</th>
                    <th>% de não ser câncer</th>
                </tr>
            </thead>
            <tbody>
                {results.map((result, index) => (
                <tr key={index}>
                    <td>{result.imageName}</td>
                    <td>{result.g_3}</td>
                    <td>{result.g_4}</td>
                    <td>{result.g_5}</td>
                    <td>{result.nc}</td>
                </tr>
                ))}
            </tbody>
        </table>
    );
}