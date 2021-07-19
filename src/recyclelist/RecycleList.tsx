/***
 Use this component inside your ReactJS Application.
 A scrollable list with different item type
 */

import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { useRef } from "react";
import {
	RecyclerListView,
	DataProvider,
	LayoutProvider,
} from "../recyclerlistview/web";
import loadingGIf from "./giphy.gif";
import sample from "./SampleVideo_1280x720_1mb.mp4";
import sample2 from "./Sample_Videos_2.mp4";
import sample3 from "./Sample_Videos_3.mp4";

import BaseScrollView, {
	ScrollEvent,
} from "../recyclerlistview/dist/web/core/scrollcomponent/BaseScrollView";
import { setTimeout, clearTimeout } from "timers";

import RecyclerListStore, { DataModel } from "./RecycleListStore";
import {
	RecyclerListViewProps,
	RecyclerListViewState,
} from "../recyclerlistview/dist/web/core/RecyclerListView";
import RecycleListStore from "./RecycleListStore";

const ViewTypes = {
	FULL: 0,
	HALF_LEFT: 1,
	HALF_RIGHT: 2,
};

let containerCount = 0;

type CellContainerProps = {
	style?: any;
	children?: JSX.Element[] | JSX.Element;
	data: DataModel;
};

const samples = [sample, sample2, sample3];

// const stream = SampleMediaStream();

const CellContainer = observer(
	({ style, children, data }: CellContainerProps) => {
		// _containerId: number;
		//const [_containerId] = useState<number>(containerCount);
		// console.log(containerCount, data);

		const _videoRef = useRef<HTMLVideoElement>(null);

		useEffect(() => {
			if (_videoRef.current) _videoRef.current.srcObject = data.stream ?? null;
		}, [data.stream]);

		return (
			// rgb (208, 148, 234)
			<div
				style={{
					backgroundColor: "#d094ea",
					width: "100%",
					height: "100%",
					...style,
				}}
			>
				{children}
				<div>container ID: {containerCount}</div>
				<video
					width="100%"
					style={{ flex: 1 }}
					ref={_videoRef}
					loop
					poster={loadingGIf}
					autoPlay
					muted
				></video>
			</div>
		);
	}
);

// this._model: DataModel[];

/***
 * To test out just copy this component and render in you root component
 */
export default class RecycleTestComponent extends React.Component {
	_layoutProvider: LayoutProvider;
	_dataProvider: DataProvider;

	_scrollEndTimer: NodeJS.Timeout;

	_willRenderedIndices: number[];

	_recyclerListViewRef: React.RefObject<
		RecyclerListView<RecyclerListViewProps, RecyclerListViewState>
	>;

	constructor(args: any) {
		super(args);

		//Create the data provider and provide method which takes in two rows of data and return if those two are different or not.
		let dataProvider = new DataProvider((r1, r2) => {
			// return r1 !== r2;
			return true;
		});

		//Create the layout provider
		//First method: Given an index return the type of item e.g ListItemType1, ListItemType2 in case you have variety of items in your list/grid
		//Second: Given a type and object set the height and width for that type on given object
		//If you need data based check you can access your data provider here
		//You'll need data in most cases, we don't provide it by default to enable things like data virtualization in the future
		//NOTE: For complex lists LayoutProvider will also be complex it would then make sense to move it to a different file
		this._layoutProvider = new LayoutProvider(
			(index) => {
				return ViewTypes.FULL;
			},
			(type, dim) => {
				dim.width = 300;
				dim.height = 300;
			}
		);

		this._rowRenderer = this._rowRenderer.bind(this);

		//Since component should always render once data has changed, make data provider part of the state
		// this.state = {
		//     dataProvider: dataProvider.cloneWithRows(this._generateArray(300)),
		// };
		this._dataProvider = dataProvider.cloneWithRows(RecyclerListStore.Model);

		this._scrollEndTimer = setTimeout(() => {
			console.log("End of scroll event", this._willRenderedIndices);
			this._loadStream();
		}, 300);
		// this._scrollEndTimer.unref();
		// Object.preventExtensions(this._scrollEndTimer);
		// this._recyclerListViewRef = useRef<RecyclerListView<RecyclerListViewProps, RecyclerListViewState>>(null);
		this._recyclerListViewRef =
			React.createRef<
				RecyclerListView<RecyclerListViewProps, RecyclerListViewState>
			>();

		this._onScrollEvent = this._onScrollEvent.bind(this);

		this._willRenderedIndices = [];

		this._ScrollTop = this._ScrollTop.bind(this);

		this._loadStream = this._loadStream.bind(this);
	}

	//Given type and data return the view component
	_rowRenderer(type: any, data: DataModel) {
		//You can return any view here, CellContainer has no special significance
		return (
			<CellContainer data={data}>
				<div>data ID: {data.ID}</div>
			</CellContainer>
		);
	}

	_reRender() {
		this.setState({});
	}

	_onVisibleIndicesChanged(
		all: number[],
		now: number[],
		notNow: number[]
	): void {
		// now.forEach(i => RecyclerListStore.start(i, this._callback.bind(this)));
		notNow.forEach((i) => RecyclerListStore.stopStream(i));
		// this._willRenderedIndices.push(...now);
		// for (var i = 0; i < notNow.length; ++i) {
		//     const a = this._willRenderedIndices.shift();
		//     if (a !== notNow[i]) console.log('wrong item dequeued!!!.');
		// }
		console.log("_onVisibleIndicesChanged", now, notNow);
		this._willRenderedIndices = all;
	}

	_loadStream() {
		// this._willRenderedIndices.forEach(i => RecycleListStore.startStream(i, 1500, this._reRender.bind(this)));
		while (this._willRenderedIndices.length) {
			// const index = this._willRenderedIndices.shift()!;
			RecycleListStore.startStream(
				this._willRenderedIndices.shift()!,
				500,
				this._reRender.bind(this)
			);
		}
	}

	_onScrollEvent(
		rawEvent: ScrollEvent,
		offsetX: number,
		offsetY: number
	): void {
		clearTimeout(this._scrollEndTimer);
		this._scrollEndTimer = setTimeout(() => {
			console.log(
				"End of scroll event",
				this._recyclerListViewRef.current?.getRenderedSize().height
			);
			this._loadStream();
		}, 300);
	}

	_ScrollTop() {
		console.log("scroll to Top");
		this._recyclerListViewRef.current?.scrollToTop(true);
		// this._recyclerListViewRef.current?.setState({});
	}

	render() {
		return (
			<div
				style={{
					// position: "absolute",
					// top: 83,
					// right: 0,
					// flex: 1,
					width: 300,
					height: "100%",
					// width: 300,
					// height: 600,
				}}
			>
				<RecyclerListView
					ref={this._recyclerListViewRef}
					canChangeSize={true}
					useWindowScroll={false}
					layoutProvider={this._layoutProvider}
					dataProvider={this._dataProvider}
					rowRenderer={this._rowRenderer}
					onVisibleIndicesChanged={this._onVisibleIndicesChanged.bind(this)}
					onScroll={this._onScrollEvent}
				/>
			</div>
		);
	}
}

export const RecycleTestComponent2 = () => {
	console.log("RecycleTestComponent2");

	let _layoutProvider: LayoutProvider;
	let _dataProvider: DataProvider;

	const divRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (divRef.current) {
			console.log(
				"RecycleTestComponent2",
				divRef.current.getBoundingClientRect()
			);
		}
	}, []);

	let _scrollEndTimer: NodeJS.Timeout = setTimeout(() => {
		console.log("End of scroll event", _willRenderedIndices);
		_loadStream();
	}, 300);

	let _willRenderedIndices: number[] = [];

	let _recyclerListViewRef: React.RefObject<
		RecyclerListView<RecyclerListViewProps, RecyclerListViewState>
	>;

	//Create the data provider and provide method which takes in two rows of data and return if those two are different or not.
	let dataProvider = new DataProvider((r1, r2) => {
		// return r1 !== r2;
		return true;
	});

	//Create the layout provider
	//First method: Given an index return the type of item e.g ListItemType1, ListItemType2 in case you have variety of items in your list/grid
	//Second: Given a type and object set the height and width for that type on given object
	//If you need data based check you can access your data provider here
	//You'll need data in most cases, we don't provide it by default to enable things like data virtualization in the future
	//NOTE: For complex lists LayoutProvider will also be complex it would then make sense to move it to a different file
	_layoutProvider = new LayoutProvider(
		(index) => {
			return 0;
		},
		(type, dim) => {
			dim.width = 300;
			dim.height = 300;
		}
	);

	// _rowRenderer = _rowRenderer.bind(this);

	//Since component should always render once data has changed, make data provider part of the state
	// this.state = {
	//     dataProvider: dataProvider.cloneWithRows(this._generateArray(300)),
	// };
	_dataProvider = dataProvider.cloneWithRows(RecyclerListStore.Model);

	// this._scrollEndTimer.unref();
	// Object.preventExtensions(this._scrollEndTimer);
	// this._recyclerListViewRef = useRef<RecyclerListView<RecyclerListViewProps, RecyclerListViewState>>(null);
	_recyclerListViewRef =
		React.createRef<
			RecyclerListView<RecyclerListViewProps, RecyclerListViewState>
		>();

	// this._onScrollEvent = this._onScrollEvent.bind(this);

	_willRenderedIndices = [];

	// this._ScrollTop = this._ScrollTop.bind(this);

	// this._loadStream = this._loadStream.bind(this);

	//Given type and data return the view component
	function _rowRenderer(type: any, data: DataModel) {
		//You can return any view here, CellContainer has no special significance
		return (
			<CellContainer data={data}>
				<div>data ID: {data.ID}</div>
			</CellContainer>
		);
	}

	function _reRender() {
		// this.setState({});
		_recyclerListViewRef.current?.setState({});
	}

	function _onVisibleIndicesChanged(
		all: number[],
		now: number[],
		notNow: number[]
	): void {
		// now.forEach(i => RecyclerListStore.start(i, this._callback.bind(this)));
		notNow.forEach((i) => RecyclerListStore.stopStream(i));

		// console.log('_onVisibleIndicesChanged', now, notNow);
		_willRenderedIndices = all;
	}

	function _loadStream() {
		// this._willRenderedIndices.forEach(i => RecycleListStore.startStream(i, 1500, this._reRender.bind(this)));
		while (_willRenderedIndices.length) {
			// const index = this._willRenderedIndices.shift()!;
			RecycleListStore.startStream(
				_willRenderedIndices.shift()!,
				500,
				_reRender
			);
		}
	}

	function _onScrollEvent(
		rawEvent: ScrollEvent,
		offsetX: number,
		offsetY: number
	): void {
		clearTimeout(_scrollEndTimer);
		_scrollEndTimer = setTimeout(() => {
			if (_recyclerListViewRef.current) {
				console.log(
					"renderedHeight:",
					_recyclerListViewRef.current?.getRenderedSize().height,
					_recyclerListViewRef.current.renderCompat()
				);
			}
			console.log("End of scroll event");
			_loadStream();
		}, 300);
	}

	function _ScrollTop() {
		console.log("scroll to Top");
		_recyclerListViewRef.current?.scrollToTop(true);
		// this._recyclerListViewRef.current?.setState({});
	}

	return (
		<div
			ref={divRef}
			style={{
				// position: "absolute",
				// top: 83,
				// right: 0,
				// flex: 1,
				position: "relative",
				//   - ms - flex - negative: 0,
				//     flex - shrink: 0,
				width: 300,
				height: 600,
				padding: "0 4px",
			}}
		>
			{/* <button style={{ width: "100%", backgroundColor: "white", }} onClick={this._ScrollTop}>go top</button> */}
			<RecyclerListView
				ref={_recyclerListViewRef}
				canChangeSize
				useWindowScroll={false}
				layoutProvider={_layoutProvider}
				dataProvider={_dataProvider}
				rowRenderer={_rowRenderer}
				onVisibleIndicesChanged={_onVisibleIndicesChanged.bind(this)}
				onScroll={_onScrollEvent}
			/>
		</div>
	);
};
