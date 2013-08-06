package Parser;
use strict;
use warnings;
use Data::Dumper;
use Log;


sub new {
    my ($class, %args) = @_;
    return bless \%args, $class;
}


sub parse {
    my $self = shift;

    open my $fh, '<', $self->{filename} or die $!;
    my @lines = <$fh>;
    chomp(@lines);
    
    my @ret = map {
        my %values = ();
        
        foreach (split(/\t/, $_)) {
            my $colon = index($_, ':');
            my ($key, $value) = (substr($_, 0, $colon), substr($_, $colon+1));
            if ($value ne "-"){
                $values{$key} = $value;
            }
        }
        
        Log->new(%values);
    } @lines;
    
    return \@ret;
}


1;
