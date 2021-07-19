import React from "react";
import { AutoSizer, List, ListRowProps } from 'react-virtualized';

import './hypermeetingwebcss-master/dist/css/style.css';

// List data as an array of strings
const list = [
    'Brian Vaughn',
    // And so on...
    'aaaaaaaaaaaaa',
    'bbbbbbbbbbbb',
];

const _generateArray = (n: number) => {
    let arr = new Array(n);
    for (let i = 0; i < n; i++) {
        arr[i] = i;
    }
    return arr;
}

const list2 = _generateArray(100);


function rowRenderer({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
}: ListRowProps) {
    const user = list2[index];

    // If row content is complex, consider rendering a light-weight placeholder while scrolling.
    const content = isScrolling ? '..........' : user;

    // Style is required since it specifies how the row is to be sized and positioned.
    // React Virtualized depends on this sizing/positioning for proper scrolling behavior.
    // By default, the List component provides following style properties:
    //    position
    //    left
    //    top
    //    height
    //    width
    // You can add additional class names or style properties as you would like.
    // Key is also required by React to more efficiently manage the array of rows.
    const new_style: React.CSSProperties = {
        backgroundColor: "red"
    };
    return (
        <div key={key} style={{ ...style, ...new_style }}>
            {content}
        </div>
    );
}

const ReactWindowExample = () => (
    // <AutoSizer>
    //   {({height, width}) => (
    //     <List
    //       ref={registerChild}
    //       width={width}
    //       height={height}
    //       onRowsRendered={onRowsRendered}
    //       {...listProps}
    //     />
    //   )}
    // </AutoSizer>

    <div id="autosizer-div" style={{ display: 'flex', backgroundColor: "cyan", width: 300, height: 600 }}>
        <AutoSizer>
            {({ height, width }) => (
                <List
                    style={{ backgroundColor: "white" }}
                    width={width}
                    height={height}
                    rowCount={list2.length}
                    rowHeight={100}
                    rowRenderer={rowRenderer}
                />
            )}
        </AutoSizer>
    </div>


);

export default ReactWindowExample;
