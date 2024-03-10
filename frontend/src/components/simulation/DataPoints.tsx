import { useAppDispatch, useAppSelector } from "@/controller/hooks";
import { changeVisibleCell, changeVisiblePath } from "@/controller/simulation/simulationSlice";
import { convertToDataSource } from "@/helper/data_converter";
import { Card, Table, TableColumnsType, Tag } from "antd";




export const DataPoints = () => {
    const { paths, rep, visibleCells, visiblePaths } = useAppSelector(state => state.simulation);
    const dispatch = useAppDispatch();


    const handleChangeCellVisible = (row_index, col_index) => {
        dispatch(changeVisibleCell({ row_index, col_index }));
    }

    const handleChangeVisiblePath = (path_index) => {
        dispatch(changeVisiblePath(path_index));
    }
    let columns: TableColumnsType<any> = [
        {
            title: 'Path',
            dataIndex: 'path',
            key: 'path',
            width: 50,
            fixed: 'left',
            render: (_, record, row_index) => (
                <Tag  
                style={{ cursor: "pointer" }}
                title={visiblePaths[row_index] ? "Hide path" : "Show path"}
                onClick={() => handleChangeVisiblePath(row_index)} 
                color={visiblePaths[row_index] ? "green" : "gray"}
                >{record.path}</Tag>
            )
        },
        {
            title: 'Steps',
            children: paths.map((path, path_index) => {
                return {
                    title: `${path.name}`,
                    dataIndex: `${path.name}`,
                    key: `${path.name}`,
                    width: 70,
                    render: (_, record, row_index) => (
                        <Tag style={{ cursor: "pointer" }} title={visibleCells[row_index][path_index] ? "Hide" : "Show"} onClick={() => handleChangeCellVisible(row_index, path_index)} color={visibleCells[row_index][path_index] ? "blue" : "gray"}>${record[path.name]}</Tag>
                    )
                }
            }),
        },
    ];
    return (
            <Table
                pagination={false}
                columns={columns}
                dataSource={convertToDataSource(paths, rep)}
                bordered
                size="middle"
                scroll={{ x: 'calc(700px + 50%)', y: 300 }}
            />
    )
}