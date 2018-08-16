export default function topNavController($location, $filter) {
	var search = $location.search();
	var stat_date = search.stat_date;

	this.tabData   = [
	  {
	    heading: $filter('date')(new Date(stat_date.replace(/-/g,'/')), 'M月d日'),
	    route:   'modules.now',
	    params: {
	      'stat_date': stat_date
	    }
	  },
	  {
	    heading: '最近7天',
	    route:   'modules.graphWeek',
	    params: {
	      'stat_date': stat_date
	    }
	  },
	  {
	    heading: '最近30天',
	    route:   'modules.graphMonth',
	    params: {
	      'stat_date': stat_date
	    }
	  },
	  {
	    heading: '总览',
	    route:   'modules.amount',
	    params: {
	      'stat_date': stat_date
	    }
	  }
	];
}

topNavController.$inject = ['$location', '$filter'];